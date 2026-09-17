import { useEffect, useState } from "react";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [produtoEditando, setProdutoEditando] = useState(null);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/produtos");

        if (!resposta.ok) {
          throw new Error("Erro ao carregar produtos");
        }

        const dados = await resposta.json();
        setProdutos(dados);
      } catch (error) {
        console.error(error);
        alert("Não foi possível carregar os produtos.");
      }
    };

    carregarProdutos();
  }, []);

  const limparFormulario = () => {
    setNome("");
    setDescricao("");
    setPreco("");
    setCodigoBarras("");
    setProdutoEditando(null);
  };

  const salvarProduto = async (event) => {
    event.preventDefault();

    const dadosProduto = {
      nome,
      descricao,
      preco: Number(preco),
      codigoBarras,
    };

    try {
      if (produtoEditando !== null) {
        const resposta = await fetch(
          `http://localhost:3000/produtos/${produtoEditando}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosProduto),
          }
        );

        if (!resposta.ok) {
          throw new Error("Erro ao atualizar produto");
        }

        const produtoAtualizado = await resposta.json();

        setProdutos(
          produtos.map((produto) =>
            produto.id === produtoEditando
              ? produtoAtualizado
              : produto
          )
        );

        alert("Produto atualizado com sucesso!");
      } else {
        const resposta = await fetch(
          "http://localhost:3000/produtos",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosProduto),
          }
        );

        if (!resposta.ok) {
          throw new Error("Erro ao cadastrar produto");
        }

        const novoProduto = await resposta.json();
        setProdutos([...produtos, novoProduto]);

        alert("Produto cadastrado com sucesso!");
      }

      limparFormulario();
    } catch (error) {
      console.error(error);
      alert("Não foi possível salvar o produto.");
    }
  };

  const editarProduto = (produto) => {
    setProdutoEditando(produto.id);
    setNome(produto.nome);
    setDescricao(produto.descricao || "");
    setPreco(produto.preco);
    setCodigoBarras(produto.codigoBarras);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const excluirProduto = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:3000/produtos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao excluir produto");
      }

      setProdutos(
        produtos.filter((produto) => produto.id !== id)
      );

      if (produtoEditando === id) {
        limparFormulario();
      }

      alert("Produto excluído com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Não foi possível excluir o produto.");
    }
  };

  return (
    <main>
      <section className="formulario">
        <h2>
          {produtoEditando !== null
            ? "Editar Produto"
            : "Novo Produto"}
        </h2>

        <form onSubmit={salvarProduto}>
          <label>Nome do produto</label>
          <input
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Digite o nome"
            required
          />

          <label>Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
            placeholder="Digite a descrição"
          />

          <label>Preço</label>
          <input
            type="number"
            step="0.01"
            value={preco}
            onChange={(event) => setPreco(event.target.value)}
            placeholder="Digite o preço"
            required
          />

          <label>Código de barras</label>
          <input
            type="text"
            value={codigoBarras}
            onChange={(event) => setCodigoBarras(event.target.value)}
            placeholder="Digite o código de barras"
            required
          />

          <button type="submit">
            {produtoEditando !== null
              ? "Salvar Alterações"
              : "Cadastrar Produto"}
          </button>

          {produtoEditando !== null && (
            <button
              type="button"
              className="btn-cancelar"
              onClick={limparFormulario}
            >
              Cancelar
            </button>
          )}
        </form>
      </section>

      <section className="lista">
        <h2>Produtos cadastrados</h2>

        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          <div>
            {produtos.map((produto) => (
              <div className="produto" key={produto.id}>
                <h3>{produto.nome}</h3>
                <p>Descrição: {produto.descricao}</p>
                <p>Preço: R$ {produto.preco}</p>
                <p>Código de barras: {produto.codigoBarras}</p>

                <div className="acoes">
                  <button
                    type="button"
                    className="btn-editar"
                    onClick={() => editarProduto(produto)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="btn-excluir"
                    onClick={() => excluirProduto(produto.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Produtos;