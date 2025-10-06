
import Swal from "sweetalert2"
import { loginUser } from "../services/authService"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {onLogin, onLogout} from '../../store/slices/auth/authSlice'





export const useAuth = () => {

    const dispatch = useDispatch() ;
    const {user, isAdmin, isAuth} = useSelector(state => state.auth);

    const navigate = useNavigate();
    
    const handlerLogin = async({username, password}) => {

    try{
        const response =  await loginUser({username, password});
        const token = response.data.token;
        const claims =JSON.parse(window.atob(token.split(".")[1]));
        console.log(claims);
        const user = {username: claims.username}

        dispatch(onLogin({user, isAdmin: claims.isAdmin}));

        sessionStorage.setItem('login', JSON.stringify({
            isAuth: true,
            isAdmin: claims.isAdmin,
            user, 
        }));

        sessionStorage.setItem('token', `Bearer ${token}`);
        navigate('/users')
    }catch(error){
        if(error.response?.status == 401){
            Swal.fire('Error login', 'Username o password invalidos', 'error');
        }else if(error.response?.status == 403){
            Swal.fire('Error login', 'No tiene acceso al recuerso o permisos ', 'error');
        }else {
             throw error;
        }
    }
}
const handlerLogout = () => {
    dispatch(onLogout);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('login');
    sessionStorage.clear();
}

    return {
        login: {
            user,
            isAdmin,
            isAuth,
        },
        handlerLogin,
        handlerLogout,
    }
}