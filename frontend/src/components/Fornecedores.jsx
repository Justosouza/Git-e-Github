import { useEffect, useState } from "react";

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);

  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");

  const [fornecedorEditando, setFornecedorEditando] = useState(null);

  // =========================
  // CARREGAR FORNECEDORES
  // =========================
  useEffect(() => {
    const carregarFornecedores = async () => {
      try {
        const resposta = await fetch(
          "http://localhost:3000/fornecedores"
        );

        if (!resposta.ok) {
          throw new Error("Erro ao carregar fornecedores");
        }

        const dados = await resposta.json();
        setFornecedores(dados);
      } catch (error) {
        console.error(error);
        alert("Não foi possível carregar os fornecedores.");
      }
    };

    carregarFornecedores();
  }, []);

  // =========================
  // LIMPAR FORMULÁRIO
  // =========================
  const limparFormulario = () => {
    setNome("");
    setCnpj("");
    setEndereco("");
    setContato("");
    setFornecedorEditando(null);
  };

  // =========================
  // CADASTRAR OU ATUALIZAR
  // =========================
  const salvarFornecedor = async (event) => {
    event.preventDefault();

    const dadosFornecedor = {
      nome,
      cnpj,
      endereco,
      contato,
    };

    try {
      if (fornecedorEditando !== null) {
        const resposta = await fetch(
          `http://localhost:3000/fornecedores/${fornecedorEditando}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosFornecedor),
          }
        );

        if (!resposta.ok) {
          throw new Error("Erro ao atualizar fornecedor");
        }

        const fornecedorAtualizado = await resposta.json();

        setFornecedores(
          fornecedores.map((fornecedor) =>
            fornecedor.id === fornecedorEditando
              ? fornecedorAtualizado
              : fornecedor
          )
        );

        alert("Fornecedor atualizado com sucesso!");
      } else {
        const resposta = await fetch(
          "http://localhost:3000/fornecedores",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosFornecedor),
          }
        );

        if (!resposta.ok) {
          throw new Error("Erro ao cadastrar fornecedor");
        }

        const novoFornecedor = await resposta.json();

        setFornecedores([
          ...fornecedores,
          novoFornecedor,
        ]);

        alert("Fornecedor cadastrado com sucesso!");
      }

      limparFormulario();
    } catch (error) {
      console.error(error);
      alert("Não foi possível salvar o fornecedor.");
    }
  };

  // =========================
  // PREPARAR EDIÇÃO
  // =========================
  const editarFornecedor = (fornecedor) => {
    setFornecedorEditando(fornecedor.id);

    setNome(fornecedor.nome);
    setCnpj(fornecedor.cnpj);
    setEndereco(fornecedor.endereco || "");
    setContato(fornecedor.contato || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // EXCLUIR FORNECEDOR
  // =========================
  const excluirFornecedor = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este fornecedor?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:3000/fornecedores/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao excluir fornecedor");
      }

      setFornecedores(
        fornecedores.filter(
          (fornecedor) => fornecedor.id !== id
        )
      );

      if (fornecedorEditando === id) {
        limparFormulario();
      }

      alert("Fornecedor excluído com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Não foi possível excluir o fornecedor.");
    }
  };

  return (
    <main>
      <section className="formulario">
        <h2>
          {fornecedorEditando !== null
            ? "Editar Fornecedor"
            : "Novo Fornecedor"}
        </h2>

        <form onSubmit={salvarFornecedor}>
          <label>Nome do fornecedor</label>

          <input
            type="text"
            value={nome}
            onChange={(event) =>
              setNome(event.target.value)
            }
            placeholder="Digite o nome"
            required
          />

          <label>CNPJ</label>

          <input
            type="text"
            value={cnpj}
            onChange={(event) =>
              setCnpj(event.target.value)
            }
            placeholder="Digite o CNPJ"
            required
          />

          <label>Endereço</label>

          <input
            type="text"
            value={endereco}
            onChange={(event) =>
              setEndereco(event.target.value)
            }
            placeholder="Digite o endereço"
          />

          <label>Contato</label>

          <input
            type="text"
            value={contato}
            onChange={(event) =>
              setContato(event.target.value)
            }
            placeholder="Digite o contato"
          />

          <button type="submit">
            {fornecedorEditando !== null
              ? "Salvar Alterações"
              : "Cadastrar Fornecedor"}
          </button>

          {fornecedorEditando !== null && (
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
        <h2>Fornecedores cadastrados</h2>

        {fornecedores.length === 0 ? (
          <p>Nenhum fornecedor cadastrado.</p>
        ) : (
          <div>
            {fornecedores.map((fornecedor) => (
              <div
                className="produto"
                key={fornecedor.id}
              >
                <h3>{fornecedor.nome}</h3>

                <p>CNPJ: {fornecedor.cnpj}</p>
                <p>Endereço: {fornecedor.endereco}</p>
                <p>Contato: {fornecedor.contato}</p>

                <div className="acoes">
                  <button
                    type="button"
                    className="btn-editar"
                    onClick={() =>
                      editarFornecedor(fornecedor)
                    }
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="btn-excluir"
                    onClick={() =>
                      excluirFornecedor(fornecedor.id)
                    }
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

export default Fornecedores;