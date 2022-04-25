interface MdwApi {
    dispatch: Function
    getState: Function
}

export const logger = (mdwApi: MdwApi) => (next: Function) => (action: any) => {
    console.log('before', mdwApi.getState())
    console.log(action)
    next(action)
    console.log('after', mdwApi.getState())
}