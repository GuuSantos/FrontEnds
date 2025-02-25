import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button } from '@material-ui/core';
import UserLogin from '../../models/UserLogin';

import './Login.css';
import { login } from '../../services/Service';
import { addToken } from '../../Store/tokens/Actions';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';


function Login() {
    let history = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState('');

    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            tipo: "",
            token: ""
        })

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (token !== "") {
            dispatch(addToken(token))
            history('/home')
        }
    }, [token])

    async function logar(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            await login(`/usuarios/logar`, userLogin, setToken)
            toast.success('Usuário logado com sucesso!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });

        } catch (error) {
            toast.error('Dados do usuário inconsistentes. Erro ao logar!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });
        }
    }

    return (<div className="main App" id="dark">
        <p className="sign">Bem vindo  a <br>

        </br>Sustech </p>
        <form className="form" onSubmit={logar}>
            <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' variant='outlined' name='usuario' margin='normal' className="username" placeholder="Usuário" fullWidth />
            <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' variant='outlined' name='senha' margin='normal' className="password" type='password' placeholder="Senha" fullWidth />

            <Button type='submit' variant='contained' className='submit'> Logar </Button>
            <p className="forgot">
                <Link to='/cadastro' className='text-decorator-none'>
                    <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta? Cadastre-se</Typography>
                </Link>
            </p>
        </form>
    </div>


    )

}

export default Login;