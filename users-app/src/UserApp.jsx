import { Provider } from "react-redux"
import { AppRoutes } from "./AppRotutes"
import { store } from "./store/store"

export const UserApp = () => {
    return (
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    )
}