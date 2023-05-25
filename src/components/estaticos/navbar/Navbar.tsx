import { AppBar, Toolbar, Box, Typography } from "@material-ui/core";
import "./Navbar.css";
import { Grid } from "@mui/material";
import { Link, useNavigate, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { addToken } from "../../../store/tokens/actions";

function Navbar() {
  const navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) =>state.tokens
  );

  const dispatch = useDispatch();

  function goLogout(){
    dispatch(addToken(''))
    alert("Usuario deslogado")
    navigate('/login')
  }

  let navbarComponent;

  if(token !== ""){
    navbarComponent = <AppBar position="static" className="navbar">
    <Toolbar variant="dense">
      <Grid container justifyContent={"space-between"}>
        <Box className="cursor">
          <Typography variant="h5" color="inherit">
            BlogPessoal
          </Typography>
        </Box>
        <Box display="flex" justifyContent="start">
        <Link to='/home' className="text-decorator-none">
          <Box mx={1} className="cursor">
            <Typography variant="h6" color="inherit" >
              home
            </Typography>
          </Box>
          </Link>
          <Link to='/postagens' className="text-decorator-none">
          <Box mx={1} className="cursor">
            <Typography variant="h6" color="inherit">
              postagens
            </Typography>
          </Box>
          </Link>
          <Link to='/temas' className="text-decorator-none">
          <Box mx={1} className="cursor">
            <Typography variant="h6" color="inherit">
              temas
            </Typography>
          </Box>
          </Link>
          <Link to='/cadastrarTemas' className="text-decorator-none">
          <Box mx={1} className="cursor">
            <Typography variant="h6" color="inherit">
              cadastrar tema
            </Typography>
          </Box>
          </Link>
          <Box mx={1}className="cursor" onClick={goLogout}>
            <Typography variant="h6" color="inherit">
              logout
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Toolbar>
  </AppBar>

  }

  return (
    <>
      {navbarComponent}
    </>
  );
}
export default Navbar;
