interface Store<S,A> {
    getState: () => S
    subscrible: Function
    dispatch: (action: A|Function) => any
}

export function createStore<S,A>(reudcer: Function, enhance?: Function): Store<S,A> {
    if(enhance) return enhance(createStore)(reudcer)
    let state:S = reudcer(undefined, {type: 'xxx'})
    let watcher: Function[] = []

    function subscrible(fn: Function) {
        watcher.push(fn)
        return () => {
            const i = watcher.indexOf(fn)
            watcher.splice(i, 1)
        }
    }

    function dispatch(action: any) {
        state = reudcer(state, action)
        watcher.forEach(update => update())
    }

    return {
        getState: () => state,
        subscrible,
        dispatch
    }
}

function compose(...mdws: Function[]) {
    if(mdws.length === 0) return (arg: any) => arg
    if(mdws.length === 1) return mdws[0]
    return mdws.reduce((a, b) => (next:Function) => a(b(next)))
}

export const applyMiddleWare = (...mdws: Function[]) => (createStore: Function) => (reducer: Function) => {
    const store = createStore(reducer)
    const mdwApi = {
        dispatch: store.dispatch,
        getState: store.getState
    }
    mdws = mdws.map(mdw => mdw(mdwApi))
    store.dispatch = compose(...mdws)(store.dispatch)
    return store
}