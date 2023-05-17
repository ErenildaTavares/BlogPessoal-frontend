import "./login.css";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function login() {
  return (
    <>
      <Grid container alignItems="center" justifyContent="center" className="imgLogin">
        <Grid item xs={6}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            paddingX={23}
          >
            <form>
              <Box className="textos1">
                <Typography
                  variant="h4"
                  gutterBottom
                  color="textPrimary"
                  component={"h3"}
                  align="center"
                  className="cor"
                >
                  Login
                </Typography>
                <TextField
                  label="Nome de Usuario"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  className="corLog"
                />
                <TextField
                  label="Senha"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  className="corLog"
                />
                <Box marginTop={2} textAlign="center">
                  <Link to={"/home"} className="text-decorator-none">
                    <Button type="submit" variant="contained" color="primary">
                      Logar
                    </Button>
                  </Link>
                </Box>
              </Box>
            </form>
            <Box display="flex" justifyContent="center" marginTop={2}>
              <Box marginRight={1} className="cor">
                <Typography variant="subtitle1" gutterBottom align="center" >
                  Não tem uma conta?
                </Typography>
              </Box>
              <Typography
                variant="subtitle1"
                gutterBottom
                align="center"
                className="textos1 cor"
              >
                Cadastre-se
              </Typography>
            </Box>
          </Box>
          </Grid>
        </Grid>
    </>
  );
}

export default login;
