import PropTypes from 'prop-types';
import { useEffect, useState } from "react"
import { useUsers } from "../hooks/useUsers";

export const UserForm = ({ userSelected, handlerCloseForm}) => {

    const {initialUserForm, handlerAddUser, errors} = useUsers();
 
    const [UserForm, setUserForm] = useState(initialUserForm);

    const [checked, setChecked] = useState(UserForm.admin);

    const {id, username, password, email, admin } = UserForm;

    useEffect( () => {
        setUserForm({ ...userSelected,
       // password: '',
        })
    }, [userSelected]);

    const onInputChange = ({ target }) =>{
        const {name, value} = target;
        setUserForm({
            ...UserForm,
            [name] : value,
        })
    }

    const onCheckboxChange  = () =>{
        setChecked(!checked);

        setUserForm({
            ...UserForm,
            admin: checked,
        });
        
    }

    const onSubmit = (event) => {
        event.preventDefault();
        // if(!username || (!password && id === 0) || !email){
        //     Swal.fire(
        //         'Error de valicacion',
        //         'Debe completar los campos del formulario',
        //         'error'
        //       )
        //     return;
        // }

        // if (!email.includes('@')){
        //     Swal.fire(
        //         'Error de valicacion de correo',
        //         'El correo debe de ser valido',
        //         'error'
        //       )
        //       return;
        // }

        //guardar el user form en el listado de usuarios
        handlerAddUser(UserForm)
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    }
    return (
        <form action="" onSubmit={onSubmit}>
            <input className="form-control my-3 w-75" 
                placeholder="Username" 
                name="username"
                value={username}
                onChange={ onInputChange}/>
                <p className="text-danger"> {errors?.username}</p>
            {id > 0 ||  <input
                className="form-control my-3 w-75" 
                placeholder="Password" 
                name="password"
                type="password"
                value={password}
                onChange={ onInputChange}/>}
                 <p className="text-danger">{errors?.password}</p>
            
             <input className="form-control my-3 w-75" 
                placeholder="Email" 
                name="email"
                value={email}
                onChange={ onInputChange}/>
                 <p className="text-danger">{errors?.email}</p>

            <div className="my-3 form-check">
                <input type="checkbox" name="admin"
                checked={admin}
                className="form-check-input"
                onChange={onCheckboxChange} />
                <label className="form-check-label">Admin</label>
            </div>

            <input type="hidden"
            name="id"
            value={id} />
            <button className="btn btn-primary"
                type="submit">
                {id > 0 ? 'Editar' : 'Crear'}
            </button>
            {!handlerCloseForm || <button 
                className="btn btn-primary mx-2"
                type="button" 
                onClick={() => onCloseForm()}>
                    Cerrar
            </button> }
           
        </form>
    )

    
}
UserForm.propTypes = {
    // 1. userSelected debe ser un objeto (el usuario que se está editando).
    // Su estructura interna (id, username, etc.) se verifica en su uso, 
    // pero aquí se valida como objeto.
    userSelected: PropTypes.object.isRequired, 
    
    // 2. handlerCloseForm es una función que se usa para cerrar el formulario
    handlerCloseForm: PropTypes.func, 
    // Lo hice opcional (sin .isRequired) porque usas: !handlerCloseForm || <button...
    // Pero si siempre se espera, usa PropTypes.func.isRequired
}