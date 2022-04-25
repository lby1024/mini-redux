import { createContext, FC, ReactNode, useContext, useState, useEffect, ReactElement } from "react"

type Store = {
    getState: Function
    subscrible: Function
    dispatch: Function
}

const ReduxContext = createContext<Store>({
    getState: () => {},
    subscrible: () => {},
    dispatch: () => {}
})

interface ProviderProps {
    store: Store
    children: ReactNode
}

export const Provider:FC<ProviderProps> = ({store, children}) => {

    return <ReduxContext.Provider value={store}>
        {children}
    </ReduxContext.Provider>
}

export const useSelector = (fn: Function) => {
    const store = useContext(ReduxContext)
    const res = fn(store.getState())
    const [, update] = useState({})

    useEffect(() => {
        return store.subscrible(() => {     // return 的目的是 组件卸载取消订阅
            const newRes = fn(store.getState())
            if(newRes !== res) update({})
        })
    }, [])

    return res
}

export const useDispatch = () => {
    const store = useContext(ReduxContext)
    return store.dispatch
}

function getAction(mapDispatch: any, dispatch: Function) {
    if(!mapDispatch) return {dispatch}
    let res: any = {}
    for(let key in mapDispatch) {
        res[key] = (payload: any) => {
            const action = mapDispatch[key](payload)
            dispatch(action)
        }
    }
    return res
}

const changed = (old: any, newState: any) => {
    if (old instanceof Object && newState instanceof Object) {
        let res = false;
        for (let key in old) {
            if (changed(old[key], newState[key])) res = true;
        }
        return res;
    } else {
        return old === newState ? false : true;
    }
};
  
const useSub = (mapState?: Function) => {
    const store = useContext(ReduxContext)  
    const [, update] = useState({});
    let state = mapState ? mapState(store.getState()) : store.getState();

    useEffect(() => {
        return store.subscrible(() => {       // return 的目的是 组件卸载取消订阅
            let newState = mapState ? mapState(store.getState()) : store.getState();
            if (changed(state, newState)) update({});
        });
    }, [store]);
};


export const connect = (mapState?: Function, mapDispatch?: Object) => (Componet: any):FC => {
    return (props) => {
        useSub(mapState)
        const store = useContext(ReduxContext)
        const state = store.getState()
        const data = mapState ? mapState(state) : {state}
        const actions = getAction(mapDispatch, store.dispatch)

        return <Componet {...props} {...data} {...actions} />
    }
}