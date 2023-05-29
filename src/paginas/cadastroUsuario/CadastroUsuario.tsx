import React, { useEffect, useState, ChangeEvent } from "react";
import "./CadastroUsuario.css";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { cadastroUsuario } from "../../service/Service";
import Usuario from "../../model/Usuario";
import { toast } from "react-toastify";

function CadastroUsuario() {
  // constante para efetuar a navegação do usuário por dentro da lógica
  const navigate = useNavigate();

  // state para controlar o formulário enquanto o usuário preenche o mesmo
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    foto: "",
    senha: "",
  });

  // state que vai receber a resposta do backend, para verificar se veio tudo ok
  const [usuarioResp, setUsuarioResp] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    foto: "",
    senha: "",
  });

  // state para armazenar o campo de confirmação de senha, e fazer a checagem com a senha do usuário
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // função para atualizar o estado do confirmar senha
  function confirmSenha(event: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(event.target.value);
  }

  // função para atualizar o estado de controle do formulário de usuário, automatizada para todos os campos
  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value,
    });
  }

  // função de disparo da requisição para o backend, é bom deixar ela como assincrona
  async function cadastrar(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    // verificar se os campos de senha e confirmar senha são iguais, e com no minimo 8 caracteres
    if (usuario.senha === confirmarSenha && usuario.senha.length >= 8) {
      // caso passe pelo IF, vai executar a tentativa de cadastro, e dar o alerta de sucesso
      try {
        await cadastroUsuario("/usuarios/cadastrar", usuario, setUsuarioResp);
        toast.success("Usuario cadastrado com sucesso", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined,
        });
      } catch (error) {
        // se der erro no cadastro, por exemplo por e-mail repetido, vai cair nessa msg de erro
        toast.error("Falha ao cadastrar usuario, verifique os campos", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined,
        });
      }
    } else {
      // aqui é a mensagem de erro para o caso dos campos de senha estarem diferentes, vai avisar, e apagar os dois campos
      toast.error(
        "Os campos de Senha e Confirmar Senha estão diferentes! Por favor, tente novamente",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "colored",
          progress: undefined,
        }
      );

      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }
  }
  // controle de efeito, para levar a pessoa para a tela de login assim que o backend devolver o JSON de cadastro ok
  useEffect(() => {
    if (usuarioResp.id !== 0) {
      navigate("/login");
    }
  }, [usuarioResp]);
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      className="imgCadastro"
    >
      <Box paddingX={10}>
        <form onSubmit={cadastrar}>
          <Typography
            variant="h4"
            gutterBottom
            color="textPrimary"
            component={"h3"}
            align="center"
          >
            Cadastrar
          </Typography>
          <TextField
            name="nome"
            label="Nome completo"
            variant="outlined"
            margin="normal"
            fullWidth
            className="corpoLog"
            value={usuario.nome}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateModel(event)
            }
          />
          <TextField
            name="usuario"
            label="Endereço de e-mail"
            variant="outlined"
            margin="normal"
            fullWidth
            className="corpoLog"
            value={usuario.usuario}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateModel(event)
            }
          />
          <TextField
            name="senha"
            label="Senha"
            variant="outlined"
            type="Password"
            margin="normal"
            fullWidth
            className="corpoLog"
            value={usuario.senha}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateModel(event)
            }
          />
          <TextField
            name="confirmarSenha"
            label="Confirmar Senha"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            className="corpoLog textos2"
            value={confirmarSenha}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              confirmSenha(event)
            }
          />
          <TextField
            name="foto"
            label="Foto de Perfil"
            variant="outlined"
            margin="normal"
            fullWidth
            className="corpoLog"
          />
          <Box marginTop={2} textAlign="center">
            <Link to={"/login"} className="text-decoration-none">
              <Button
                variant="contained"
                color="secondary"
                className="btnCancelar"
              >
                Cancelar
              </Button>
            </Link>
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          </Box>
        </form>
      </Box>
    </Grid>
  );
}

export default CadastroUsuario;
