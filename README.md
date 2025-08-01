# 🛒 Connect Store - Catálogo de Produtos Interativo

*Projeto desenvolvido como desafio técnico para avaliação de habilidades em desenvolvimento Front-end com Next.js, React e TypeScript.*

---

## 🚀 Status e Demonstração

* **Status:** Finalizado ✅
* **Demonstração Ao Vivo:** `[meu-catalogo-de-produtoss.vercel.app]`

---

## 📖 Descrição do Projeto

**Connect Store** é uma aplicação web de um catálogo de produtos que permite aos usuários visualizar, buscar e filtrar itens, além de gerenciar um carrinho de compras. O projeto foi construído do zero utilizando as tecnologias mais modernas do ecossistema JavaScript, com foco em criar uma interface limpa, responsiva e uma experiência de usuário fluida.

O objetivo principal foi demonstrar a capacidade de consumir uma API REST externa, gerenciar o estado da aplicação de forma eficiente e construir uma interface reativa e bem estruturada, seguindo as melhores práticas de desenvolvimento.

---

## ✨ Funcionalidades Principais

* **Listagem de Produtos:** Os produtos são carregados dinamicamente a partir da [Fake Store API](https://fakestoreapi.com/).
* **Busca em Tempo Real:** Filtro de produtos por nome, que atualiza a lista conforme o usuário digita.
* **Filtro por Categorias:** Carregamento dinâmico das categorias da API e filtragem de produtos ao selecionar uma categoria.
* **Carrinho de Compras Interativo:**
    * Adicionar e remover itens.
    * O contador de itens é atualizado em tempo real.
    * O carrinho desliza para a tela sem recarregar a página.
    * O estado do carrinho é gerenciado globalmente com a Context API do React.
* **Layout Totalmente Responsivo:** A interface se adapta para uma experiência otimizada tanto em desktops quanto em dispositivos móveis, utilizando o padrão de "menu hambúrguer" para a navegação mobile.
* **Páginas Estáticas:** Como a página "Sobre Nós", utilizando o sistema de roteamento do Next.js.

---

## 🛠️ Tecnologias Utilizadas

As seguintes ferramentas e tecnologias foram usadas na construção do projeto:

* **[Next.js](https://nextjs.org/)** (Framework React com foco em produção)
* **[React](https://react.dev/)** (Biblioteca para construção de interfaces)
* **[TypeScript](https://www.typescriptlang.org/)** (Para tipagem estática e segurança no código)
* **[Tailwind CSS](https://tailwindcss.com/)** (Framework de estilização utility-first)
* **[Context API](https://react.dev/learn/passing-data-deeply-with-context)** (Para gerenciamento de estado global)
* **[Lucide React](https://lucide.dev/)** (Biblioteca de ícones)
* **[ESLint](https://eslint.org/)** (Para padronização e qualidade de código)

---

## ⚙️ Como Executar o Projeto Localmente

Para rodar este projeto na sua máquina, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd nome-do-projeto
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```
    *(ou `yarn install` se você usar o Yarn)*

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Abra o navegador:**
    Acesse [`http://localhost:3000`](http://localhost:3000) para ver a aplicação funcionando.

---
