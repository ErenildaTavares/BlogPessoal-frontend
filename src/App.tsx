import Navbar from "./components/estaticos/navbar/Navbar";
import Footer from "./components/estaticos/footer/Footer";
import "./App.css";
import Home from "./paginas/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./paginas/login/Login";
import CadastroUsuario from "./paginas/cadastroUsuario/CadastroUsuario";
import ListaPostagens from "./components/postagens/listaPostagens/ListaPostagens";
import ListaTemas from "./components/temas/listaTemas/ListaTemas";
import CadastrarPostagens from "./components/postagens/cadastrarPostagens/CadastrarPostagens";
import DeletarPostagens from "./components/postagens/deletarPostagens/DeletarPostagens";
import CadastrarTemas from "./components/temas/cadastrarTemas/CadastrarTemas";
import DeletarTemas from "./components/temas/deletarTemas/DeletarTemas";
import {Provider} from 'react-redux';
import store from './store/store'

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: "85vh" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastrar" element={<CadastroUsuario />} />
          <Route path="/postagens" element={<ListaPostagens />} />
          <Route path="/temas" element={<ListaTemas />} />
          <Route path="/cadastrarPostagens" element={<CadastrarPostagens />} />
          <Route path="/cadastrarPostagens/:id" element={<CadastrarPostagens />}/>
          <Route path="/cadastrarTemas" element={<CadastrarTemas />} />
          <Route path="/cadastrarTemas/:id" element={<CadastrarTemas />} />
          <Route path="/deletarPostagens/:id" element={<DeletarPostagens />} />
          <Route path="/deletarTema/:id" element={<DeletarTemas />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
