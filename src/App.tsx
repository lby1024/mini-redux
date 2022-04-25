import Add from './componets/add'
import Minus from './componets/minus'
import Name from './componets/name'
import { Provider } from './modules/react-redux'
import {store} from './store'

function App() {

  return <div className="app">
    <Provider store={store} >
      <Add/>
      <Minus/>
      <Name/>
    </Provider>
  </div>
}

export default App
