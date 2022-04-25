import { useDispatch, useSelector } from "../modules/react-redux"
import { actions, State } from "../store"

const Add = () => {
    const age = useSelector((state:State)  => state.age)
    const dispatch = useDispatch()
    const add = () => dispatch(actions.add(3))
    const addAsync = () => dispatch(actions.addAsync(10))

    return <div>
        <h1>Add:</h1>
        <h2>
            <span>{age}</span>
            <button onClick={add} >+</button>
            <button onClick={addAsync} >异步加</button>
        </h2>
    </div>
}

export default Add