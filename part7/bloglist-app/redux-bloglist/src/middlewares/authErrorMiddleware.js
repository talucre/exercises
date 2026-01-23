import { errorHandled } from '../reducers/errorReducer'
import { notify } from '../reducers/notificationReducer'
import { logout } from '../reducers/userReducer'

export const authErrorMiddleware = store => next => action => {
    if (action.type.endsWith('/rejected') && action.payload.status === 401) {
        if (action.meta.arg.endpointName === 'login') {
            return next(action)
        }
        store.dispatch(logout())
        store.dispatch(
            notify({
                message: 'Пожалуйста, выполните повторный вход',
                type: 'error',
            }),
        )
        store.dispatch(errorHandled())
    }
    return next(action)
}
