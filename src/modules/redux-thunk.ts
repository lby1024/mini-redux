interface MdwApi {
    dispatch: Function
    getState: Function
}

export const thunk = (mdwApi: MdwApi) => (next: Function) => (action: any) => {
    if(action instanceof Function) {
        return action(mdwApi.dispatch, mdwApi.getState)
    }
    return next(action)
}