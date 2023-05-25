import {Button, Card, CardActions, CardContent, Typography,
} from "@material-ui/core";
import { Box } from "@mui/material";
import Tema from "../../../model/Tema";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { useEffect, useState } from "react";
import { buscaId, deleteId } from "../../../service/Service";

function DeletarTemas() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [token, setToken] = useLocalStorage("token");
  const [tema, setTema] = useState<Tema>();

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    buscaId(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }
  
  function sim() {
    navigate('/temas')
      deleteId(`/temas/${id}`, {
        headers: {
          'Authorization': token
        }
      });
      alert('Tema deletado com sucesso');
    }
  
    function nao() {
      navigate('/temas')
    }
  
  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar o Tema:
              </Typography>
              <Typography color="textSecondary">{tema?.descricao}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
              <Box mx={2}>
                <Button
                  variant="contained"
                  className="marginLeft"
                  size="large"
                  color="primary"
                  onClick={sim}
                >
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button variant="contained" size="large" color="secondary" onClick={nao}>
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarTemas;
