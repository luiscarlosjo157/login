import {Navigate, Route, Routes } from "react-router-dom"
import { UsersPage } from "../pages/UsersPage"
import {Navbar} from '../components/layout/Navbar'
import { RegisterPage } from "../pages/RegisterPage"
import { useAuth } from "../auth/hooks/useAuth"


export const UserRoutes = () =>{
    const { login } = useAuth()
    return( 
        <>
                <Navbar></Navbar>
                <Routes>
                    <Route path="users" element={<UsersPage

                    ></UsersPage>}></Route>
                    {!login.isAdmin || <>
                        <Route path="users/register" element={<RegisterPage></RegisterPage>}></Route>
                        <Route path="users/edit/:id" element={<RegisterPage></RegisterPage>}></Route>
                    </>}
                    <Route path="/" element={<Navigate to="/users" />}></Route>
                    
                </Routes>

        </>
    )
}