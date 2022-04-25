import { applyMiddleWare, createStore } from "./modules/redux"
import { logger } from "./modules/redux-log"
import { thunk } from "./modules/redux-thunk"

const initState = {
    name: 'jack',
    age: 22
}

export type State = typeof initState

type Action = {
    type: 'add'|'minus',
    payload: number
}

function reducer(state=initState, action: Action) {
    if(action.type === 'add') return {...state, age: state.age+action.payload}
    if(action.type === 'minus') return {...state, age: state.age-action.payload}
    return state
}

export const store = createStore<State, Action>(reducer, applyMiddleWare(thunk,logger))

export type Dispatch = typeof store.dispatch

export const actions = {
    add: (payload: number): Action => ({
        type: 'add',
        payload
    }),
    minus: (payload: number): Action => ({
        type: 'minus',
        payload
    }),
    addAsync: (payload: number) => {
        return (dispatch: Dispatch) => {
            setTimeout(() => {
                dispatch({type: 'add', payload})
            }, 1000)
        }
    }
}