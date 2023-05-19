import { AppBar, Toolbar, Box, Typography } from "@material-ui/core";
import "./Navbar.css";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar variant="dense">
          <Grid container justifyContent={"space-between"}>
            <Box className="cursor">
              <Typography variant="h5" color="inherit">
                BlogPessoal
              </Typography>
            </Box>

            <Box display="flex" justifyContent="start">
            <Link to='/home'>
              <Box mx={1} className="cursor">
                <Typography variant="h6" color="inherit" >
                  home
                </Typography>
              </Box>
              </Link>
              <Link to='/postagens'>
              <Box mx={1} className="cursor">
                <Typography variant="h6" color="inherit">
                  postagens
                </Typography>
              </Box>
              </Link>
              <Box mx={1} className="cursor">
                <Typography variant="h6" color="inherit">
                  temas
                </Typography>
              </Box>
              <Box mx={1} className="cursor">
                <Typography variant="h6" color="inherit">
                  cadastrar tema
                </Typography>
              </Box>
              <Link to={"/login"} className="text-decorator-none" >
              <Box mx={1}className="cursor">
                <Typography variant="h6" color="inherit">
                  logout
                </Typography>
              </Box>
              </Link>
              
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Navbar;
