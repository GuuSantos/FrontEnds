import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@material-ui/core";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../Store/tokens/TokensReducer";
import {toast} from "react-toastify";
import { addToken } from "../../../Store/tokens/Actions";

function Navbar() {

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );    
    let navigate = useNavigate();
    const dispatch = useDispatch();

    function goLogout() {
        dispatch(addToken(''))
        toast.info('Usuario Deslogado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: 'colored',
            progress: undefined,
        });
        navigate('/login')
    }

    var navBarComponent;
    
    if(token !== ""){
        navBarComponent = <AppBar position="static">
        <Toolbar variant="dense">
            <Box className='cursor' >
                <Link to="/home" className="text-decorator-none">
                    <Typography variant="h5" className="tituloNavbar">
                        SUStech
                    </Typography>
                </Link>
            </Box>


            <Box mx={1} className='cursor' display="flex" justifyContent="start">
                <Link to="/home" className="text-decorator-none">
                    <Typography variant="h6" className="tituloNavbar">
                        Home
                    </Typography>
                </Link>
            </Box>

            <Box mx={1} className='cursor' >
                <Link to="/listarProdutos" className="text-decorator-none">
                    <Typography variant="h6" className="tituloNavbar">
                        Produtos
                    </Typography>
                </Link>
            </Box>

            <Box mx={1} className='cursor' >
                <Link to="/formularioProduto" className="text-decorator-none">
                    <Typography variant="h6" className="tituloNavbar">
                        Cadastrar produtos
                    </Typography>
                </Link>
            </Box>

            <Box mx={1} className='cursor' >
                <Link to="/formularioCategoria" className="text-decorator-none">
                    <Typography variant="h6" className="tituloNavbar">
                    Cadastrar Categoria
                    </Typography>
                </Link>
            </Box>

            <Box mx={1} className='cursor' >
                <Link to="/listaCategorias" className="text-decorator-none">
                    <Typography variant="h6" className="tituloNavbar">
                        Categorias
                    </Typography>
                </Link>
            </Box>
            <Box mx={1} className='cursor' onClick={goLogout}>
                <Typography variant="h6" className="tituloNavbar">
                    Logout
                </Typography>
            </Box>
        </Toolbar>
    </AppBar>
    }
    return (
        <>
            {navBarComponent}
        </>
    )
}

export default Navbar;