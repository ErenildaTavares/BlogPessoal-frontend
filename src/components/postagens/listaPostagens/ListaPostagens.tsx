import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {Card, CardActions, CardContent, Button,Typography,} from "@material-ui/core";
import { Box } from "@mui/material";
import "./ListaPostagens.css";
import { busca } from "../../../service/Service";
import Postagem from '../../../model/Postagem';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';



function ListaPostagens() {
  const [postagens, setPostagens] = useState<Postagem[]>([])
  const navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) =>state.tokens
  );
  
  function getPostagens() {
    busca('/postagens', setPostagens, {
      headers: {
        Authorization: token
      }
    })
  }
  
  useEffect(() => {
    getPostagens()
  }, [])

  useEffect(() => {
    if(token === ''){ 
      alert('Você precisa estar logado')
      navigate('/login')
    }
  }, [])

  return (
    <>
    {
      postagens.map(postagens =>(
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Postagens
            </Typography>
            <Typography variant="h5" component="h2">
              {postagens.titulo}
            </Typography>
            <Typography variant="h5" component="h2">
              {postagens.texto}
            </Typography>
          {/* <Typography>{new Intl.DateTimeFormat('pt-br', {
              dateStyle: 'full'
            }).format(new Date(postagens.data))}
            </Typography> */}
          <Typography variant="h5" component="h2">
              {postagens.tema?.descricao}
            </Typography>
            </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>
              <Link to={`/cadastrarPostagens/${postagens.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button
                    variant="contained"
                    className="marginLeft"
                    size="small"
                    color="primary"
                  >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarPostagens/${postagens.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size="small" color="secondary">
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

export default ListaPostagens;
