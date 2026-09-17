import { useState } from "react";
import Produtos from "./components/Produtos";
import Fornecedores from "./components/Fornecedores";
import Associacoes from "./components/Associacoes";
import "./App.css";

function App() {
  const [pagina, setPagina] = useState("produtos");

  return (
    <div className="app">
      <header>
        <h1>Sistema de Gestão</h1>
        <p>Produtos e Fornecedores</p>
      </header>

      <nav className="menu">
        <button
          className={pagina === "produtos" ? "ativo" : ""}
          onClick={() => setPagina("produtos")}
        >
          Produtos
        </button>

        <button
          className={pagina === "fornecedores" ? "ativo" : ""}
          onClick={() => setPagina("fornecedores")}
        >
          Fornecedores
        </button>

        <button
          className={pagina === "associacoes" ? "ativo" : ""}
          onClick={() => setPagina("associacoes")}
        >
          Produto × Fornecedor
        </button>
      </nav>

      {pagina === "produtos" && <Produtos />}
      {pagina === "fornecedores" && <Fornecedores />}
      {pagina === "associacoes" && <Associacoes />}
    </div>
  );
}

export default App;