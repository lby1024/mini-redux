import { useSelector } from "../modules/react-redux"
import { State } from "../store"

const Name = () => {
    const name = useSelector((state: State) => state.name)

    console.log('render')
    return <div>
        <h1>Name:</h1>
        <h2>
            <span>{name}</span>
        </h2>
    </div>
}

export default Name