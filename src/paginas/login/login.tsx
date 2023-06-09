import "./Login.css";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { login } from "../../service/Service";
import UsuarioLogin from "../../model/UsuarioLogin";
import { useDispatch } from "react-redux";
import { addToken } from "../../store/tokens/actions";
import { toast } from "react-toastify";

function Login() {
  // cria a variavel para navegação interna pela rota
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // cria um estado para armazenamento no localStorage do navegador
  const [token, setToken] = useState("");

  // cria um estado de controle para o usuário preencher os dados de login
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  // atualiza os dados do estado acima, e ajuda a formar o JSON para a requisição
  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [event.target.name]: event.target.value,
    });
  }
  //envia o formulário para o backend
  async function enviar(event: ChangeEvent<HTMLFormElement>) {
    // previne atualização da pagina
    event.preventDefault();
    try {
      await login("/usuarios/logar", usuarioLogin, setToken);
      toast.success("Usuario logado com sucesso", {
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
      toast.error("Usuario e/ou senha inválidos", {
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
  }
  //quando chega algo diferente de vazio, navega o usuario pra home
  useEffect(() => {
    if (token !== "") {
      dispatch(addToken(token));
      navigate("/home");
    }
  }, [token]);

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className="imgLogin"
      >
        <Grid item xs={6}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            paddingX={23}
            className="fundoLog"
          >
            <form onSubmit={enviar}>
              <Box className="textos1">
                <Typography
                  variant="h4"
                  gutterBottom
                  color="textPrimary"
                  component={"h3"}
                  align="center"
                  className="corlogin"
                >
                  Login
                </Typography>
                <TextField
                  name="usuario"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  className="corpoLog"
                  value={usuarioLogin.usuario}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updateModel(event)
                  }
                />
                <TextField
                  name="senha"
                  label="Senha"
                  type="password"
                  error={
                    usuarioLogin.senha.length < 8 &&
                    usuarioLogin.senha.length > 0
                  }
                  helperText={
                    usuarioLogin.senha.length < 8 &&
                    usuarioLogin.senha.length > 0
                      ? "A senha tem que ter mais no mínimo  caracteres"
                      : ""
                  }
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  className="corpoLog"
                  value={usuarioLogin.senha}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updateModel(event)
                  }
                />
                <Box marginTop={2} textAlign="center">
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Logar
                  </Button>
                </Box>
              </Box>
            </form>
            <Box display="flex" justifyContent="center" marginTop={2}>
              <Box marginRight={1} className="cor">
                <Typography variant="subtitle1" gutterBottom align="center">
                  Não tem uma conta?
                </Typography>
              </Box>
              <Link to={"/cadastrar"}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  align="center"
                  className="textos1 cor"
                >
                  Cadastre-se
                </Typography>
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid className="titleB">
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ fontSize: "60px" }}
            align="center"
           
          >
            Bem Vindo!
          </Typography>
          <Typography style={{ fontSize: "30px" }}>
            Faça seu login ou cadastre-se
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
