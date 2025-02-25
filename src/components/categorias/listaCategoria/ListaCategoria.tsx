import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import Categoria from '../../../models/Categoria';
import './ListaCategoria.css';
import useLocalStorage from 'react-use-localstorage';
import {useNavigate} from 'react-router-dom';
import { busca } from '../../../services/Service';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../Store/tokens/TokensReducer';


function ListaCategoria(){


    const [categoria, setCategoria] =useState<Categoria[]>([]);
    const token = useSelector<TokenState, TokenState["tokens"]>(
      (state) => state.tokens
  );
    let navigate =useNavigate();

    useEffect(()=>{
        if(token == ''){
          toast.error('Você precisa estar logado!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: 'colored',
            progress: undefined,
        });
          navigate ("/login")
        }
      }, [token])

      async function getCategoria(){
        await busca("/categorias", setCategoria, {
          headers: {
            'Authorization': token
          }
        })  }
    
    
      useEffect(()=>{
        getCategoria()
      }, [categoria.length])

    return (
        <>
        
        {
          
          categoria.map(categoria =>(

          <Box m={2} >
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Categoria
                </Typography>
                <Typography variant="h5" component="h2">
                 {categoria.tipo}
                </Typography>
                <Typography variant="h5" component="h2">
                 {categoria.palavraChave}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5} >
    
                  <Link to={`/formularioCategoria/${categoria.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" className="marginLeft" size='small' color="primary" >
                        atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarCategoria/${categoria.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" size='small' color="secondary">
                        deletar
                      </Button>
                    </Box>
                    
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>
          ))
          }
        </>
      );
    
}

export default ListaCategoria;

