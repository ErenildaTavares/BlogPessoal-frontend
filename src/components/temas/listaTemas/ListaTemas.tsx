import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Card, CardActions, CardContent, Button,Typography,
} from "@material-ui/core";
import { Box } from "@mui/material";
import "./ListaTemas.css";
import Tema from "../../../model/Tema";
import useLocalStorage from "react-use-localstorage";
import { busca } from "../../../service/Service";

function ListaTemas() {
  const [temas, setTemas] = useState<Tema[]>([]);
  const [token, setToken] = useLocalStorage("token");
  const navigate = useNavigate();

  async function getTemas() {
    await busca("/temas", setTemas, {
      Headers: {
        Autorization: token
      }
    });
  }
  useEffect(() => {
    getTemas()
  }, [temas.length])

  useEffect(() => {
    if (token == "") {
      alert("Voce precisa estar logado");
      navigate("/login");
    }
  }, [token]);

  return (
    <>
    {
      temas.map(tema =>(
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Tema numero {tema.id}
            </Typography>
            <Typography variant="h5" component="h2">
              Descrição do tema: {tema.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>
              <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
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
              <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
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

export default ListaTemas;
