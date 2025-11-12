import ReactDOM from 'react-dom/client'
import App from './App'
import Notification from './components/Notification'
import { NotificationProvider } from './components/contexts/NotificationContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <NotificationProvider>
        <Notification />
        <App />
    </NotificationProvider>
)
