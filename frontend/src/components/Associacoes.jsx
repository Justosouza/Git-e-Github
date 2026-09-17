import { useEffect, useState } from "react";

function Associacoes() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  const [produtoId, setProdutoId] = useState("");
  const [fornecedorId, setFornecedorId] = useState("");

  const [fornecedoresProduto, setFornecedoresProduto] = useState([]);
  const [produtosFornecedor, setProdutosFornecedor] = useState([]);

  // =========================
  // CARREGAR PRODUTOS E FORNECEDORES
  // =========================
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const respostaProdutos = await fetch(
          "http://localhost:3000/produtos"
        );

        const respostaFornecedores = await fetch(
          "http://localhost:3000/fornecedores"
        );

        if (!respostaProdutos.ok || !respostaFornecedores.ok) {
          throw new Error("Erro ao carregar dados");
        }

        const dadosProdutos = await respostaProdutos.json();
        const dadosFornecedores = await respostaFornecedores.json();

        setProdutos(dadosProdutos);
        setFornecedores(dadosFornecedores);
      } catch (error) {
        console.error(error);
        alert("Não foi possível carregar produtos e fornecedores.");
      }
    };

    carregarDados();
  }, []);

  // =========================
  // ASSOCIAR
  // =========================
  const associar = async () => {
    if (!produtoId || !fornecedorId) {
      alert("Selecione um produto e um fornecedor.");
      return;
    }

    try {
      const resposta = await fetch(
        "http://localhost:3000/produto-fornecedor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            produtoId: Number(produtoId),
            fornecedorId: Number(fornecedorId),
          }),
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao associar");
      }

      alert("Produto associado ao fornecedor com sucesso!");

      await consultarFornecedoresDoProduto();
      await consultarProdutosDoFornecedor();
    } catch (error) {
      console.error(error);
      alert("Não foi possível realizar a associação.");
    }
  };

  // =========================
  // DESASSOCIAR
  // =========================
  const desassociar = async () => {
    if (!produtoId || !fornecedorId) {
      alert("Selecione um produto e um fornecedor.");
      return;
    }

    const confirmar = window.confirm(
      "Deseja desassociar este produto do fornecedor?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(
        "http://localhost:3000/produto-fornecedor",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            produtoId: Number(produtoId),
            fornecedorId: Number(fornecedorId),
          }),
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao desassociar");
      }

      alert("Produto desassociado do fornecedor com sucesso!");

      await consultarFornecedoresDoProduto();
      await consultarProdutosDoFornecedor();
    } catch (error) {
      console.error(error);
      alert("Não foi possível desassociar.");
    }
  };

  // =========================
  // FORNECEDORES DE UM PRODUTO
  // =========================
  const consultarFornecedoresDoProduto = async () => {
    if (!produtoId) {
      setFornecedoresProduto([]);
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:3000/produtos/${produtoId}/fornecedores`
      );

      if (!resposta.ok) {
        throw new Error("Erro na consulta");
      }

      const dados = await resposta.json();
      setFornecedoresProduto(dados);
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // PRODUTOS DE UM FORNECEDOR
  // =========================
  const consultarProdutosDoFornecedor = async () => {
    if (!fornecedorId) {
      setProdutosFornecedor([]);
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:3000/fornecedores/${fornecedorId}/produtos`
      );

      if (!resposta.ok) {
        throw new Error("Erro na consulta");
      }

      const dados = await resposta.json();
      setProdutosFornecedor(dados);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <section className="formulario">
        <h2>Produto × Fornecedor</h2>

        <label>Produto</label>

        <select
          value={produtoId}
          onChange={(event) => setProdutoId(event.target.value)}
        >
          <option value="">Selecione um produto</option>

          {produtos.map((produto) => (
            <option key={produto.id} value={produto.id}>
              {produto.nome}
            </option>
          ))}
        </select>

        <label>Fornecedor</label>

        <select
          value={fornecedorId}
          onChange={(event) => setFornecedorId(event.target.value)}
        >
          <option value="">Selecione um fornecedor</option>

          {fornecedores.map((fornecedor) => (
            <option key={fornecedor.id} value={fornecedor.id}>
              {fornecedor.nome}
            </option>
          ))}
        </select>

        <button type="button" onClick={associar}>
          Associar
        </button>

        <button
          type="button"
          className="btn-excluir"
          onClick={desassociar}
        >
          Desassociar
        </button>

        <button
          type="button"
          className="btn-consultar"
          onClick={consultarFornecedoresDoProduto}
        >
          Consultar fornecedores do produto
        </button>

        <button
          type="button"
          className="btn-consultar"
          onClick={consultarProdutosDoFornecedor}
        >
          Consultar produtos do fornecedor
        </button>
      </section>

      <section className="lista">
        <h2>Associações</h2>

        <h3>Fornecedores do produto selecionado</h3>

        {fornecedoresProduto.length === 0 ? (
          <p>Nenhum fornecedor associado.</p>
        ) : (
          fornecedoresProduto.map((fornecedor) => (
            <div className="produto" key={fornecedor.id}>
              <strong>{fornecedor.nome}</strong>
              <p>CNPJ: {fornecedor.cnpj}</p>
            </div>
          ))
        )}

        <h3>Produtos do fornecedor selecionado</h3>

        {produtosFornecedor.length === 0 ? (
          <p>Nenhum produto associado.</p>
        ) : (
          produtosFornecedor.map((produto) => (
            <div className="produto" key={produto.id}>
              <strong>{produto.nome}</strong>
              <p>Preço: R$ {produto.preco}</p>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default Associacoes;