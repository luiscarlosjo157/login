import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom"
import { useUsers } from "../hooks/useUsers"
import { useAuth } from "../auth/hooks/useAuth"

export const UserRow = ({id, username, email, admin}) =>{

    const {handlerUserSelectedForm, handlerRemoveUser} = useUsers(); 
    const { login } = useAuth();

     return(
        <>
         <tr >
                            <td>{id}</td>
                            <td>{username}</td>
                            <td>{email}</td>
                            {!login.isAdmin || <>
                                <td>
                                    <NavLink className={'btn btn-secondary btn-sm'}
                                    to={'/users/edit/' + id}>Edit</NavLink>
                                    
                                </td>
                                <td>
                                    <button type="buttun"
                                    className="btn btn-secondary brn-sm"
                                    onClick={() => handlerUserSelectedForm({
                                        id,
                                        username,
                                        email,
                                        admin,
                                 })}
                                >Update</button>
                            </td>
                            <td>
                                <button type="buttun"
                                 className="btn btn-danger brn-sm"
                                 onClick={() => handlerRemoveUser(id)}>Remove</button>
                            </td>
                            </>}
                        </tr>
        </>
    )
}
UserRow.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired,
    // Asegúrate de incluir y validar las funciones si también se usan
    handlerRemoveUser: PropTypes.func.isRequired,
    handlerUserSelectedForm: PropTypes.func.isRequired,
}