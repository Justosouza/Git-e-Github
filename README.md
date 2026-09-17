# Projeto Integrador

FACULDADE GRAN  
https://faculdade.grancursosonline.com.br/

**Projeto Disciplina Projeto Integrador**

## Sobre o projeto

Aplicação web desenvolvida para gerenciamento de produtos e fornecedores.

O sistema permite realizar operações de cadastro, consulta, atualização e exclusão de produtos e fornecedores, além de permitir a associação entre produtos e fornecedores.

## Funcionalidades

- Cadastro de produtos
- Listagem de produtos
- Edição de produtos
- Exclusão de produtos
- Cadastro de fornecedores
- Listagem de fornecedores
- Edição de fornecedores
- Exclusão de fornecedores
- Associação de produtos a fornecedores
- Desassociação de produtos e fornecedores
- Consulta dos fornecedores de um produto
- Consulta dos produtos de um fornecedor

## Tecnologias utilizadas

### Backend

- Node.js
- Express
- Sequelize
- SQLite
- CORS

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Ferramentas

- Visual Studio Code
- Insomnia
- Git
- GitHub

## Estrutura

O projeto possui backend e frontend integrados.

O backend disponibiliza uma API REST responsável pela comunicação com o banco de dados SQLite.

O frontend foi desenvolvido em React e consome a API para realizar as operações do sistema.

## Execução do Backend

Na pasta principal do projeto:

```bash
npm install
node app.js