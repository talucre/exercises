import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './reducers/store'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>,
)

// TODO
//
//
// 7.16 blog view
//
// 7.18 comments 1
// 7.19 comments 2
// 7.20 styles 1
// 7.21 styles 2
