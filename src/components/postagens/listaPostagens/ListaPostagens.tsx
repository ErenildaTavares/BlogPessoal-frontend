import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {Card, CardActions, CardContent, Button,Typography,} from "@material-ui/core";
import { Box } from "@mui/material";
import "./ListaPostagens.css";
import useLocalStorage from "react-use-localstorage";
import { busca } from "../../../service/Service";
import { Postagem } from '../../../model/Postagem';

function ListaPostagens() {
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [token, setToken] = useLocalStorage("token");
  const navigate = useNavigate();

  async function getPostagens() {
    await busca("/postagens", setPostagens, {
      Headers: {
        Autorization: token
      }
    });
  }
  useEffect(() => {
    getPostagens()
  }, [postagens.length])

  useEffect(() => {
    if (token == "") {
      alert("Voce precisa estar logado");
      navigate("/login");
    }
  }, [token]);

  return (
    <>
    {
      postagens.map(postagem =>(
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Postagens
            </Typography>
            <Typography variant="h5" component="h2">
              {postagem.titulo}
            </Typography>
            <Typography variant="h5" component="h2">
              {postagem.texto}
            </Typography>
          </CardContent>
          <Typography variant="h5" component="h2">
              {postagem.tema?.descricao}
            </Typography>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>
              <Link to={`/formularioPostagens/${postagem.id}`} className="text-decorator-none">
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
              <Link to={`/deletarPostagens/${postagem.id}`} className="text-decorator-none">
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
