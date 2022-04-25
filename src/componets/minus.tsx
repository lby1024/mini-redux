import { FC } from "react"
import { connect } from "../modules/react-redux"
import { actions, Dispatch, State } from "../store"

interface MinusProps {
    age: number
    minus: Function
}

const Minus:FC<MinusProps> = ({age, minus}) => {
    return <div>
        <h1>Minus:</h1>
        <h2>
            <span>{age}</span>
            <button onClick={() => minus(2)} >-</button>
        </h2>
    </div>
}

const mapState = (state: State) => ({
    age: state.age
})

const mapDispatch = {
    minus: actions.minus
}

export default connect(mapState, mapDispatch)(Minus)