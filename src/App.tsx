import Navbar from "./components/estaticos/navbar/Navbar";
import Footer from "./components/estaticos/footer/Footer";
import "./App.css";
import Home from "./paginas/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./paginas/login/Login";
import CadastroUsuario from "./paginas/cadastroUsuario/CadastroUsuario";
import ListaPostagens from "./components/postagens/listaPostagens/ListaPostagens";
import ListaTemas from "./components/temas/listaTemas/ListaTemas";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/postagens" element={<ListaPostagens />} />
          <Route path="/temas" element={<ListaTemas />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
