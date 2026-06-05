import api from "./api.js";

let user_interface = {
  async renderizarPensamentos() {
    const lista_pensamentos = document.getElementById("lista-pensamentos");

    try {
      const pensamentos = await api.buscarPensamentos();
      pensamentos.forEach(user_interface.adicionarPensamentoNaLista);
    } catch (error) {
      alert("Erro ao renderizar pensamentos.");
    }
  },

  adicionarPensamentoNaLista(pensamento) {
    const lista_pensamentos = document.getElementById("lista-pensamentos"); // constante que representa a lista de pensamentos

    // criação do elemento que representa o item da lista
    const li_pensamento = document.createElement("li");
    li_pensamento.setAttribute("data-id", pensamento.id);
    li_pensamento.classList.add("li-pensamento");

    // criação do ícone das aspas
    const icone_aspas = document.createElement("img");
    icone_aspas.src = "img/aspas-azuis.png";
    icone_aspas.alt = "Aspas azuis";
    icone_aspas.classList.add("icone-aspas");

    // criação de uma div responsável por: conter o conteúdo e a autoria; uma div para cada item
    const pensamento_conteudo = document.createElement("div");
    pensamento_conteudo.textContent = pensamento.conteudo;
    pensamento_conteudo.classList.add("pensamento-conteudo");

    const pensamento_autoria = document.createElement("div");
    pensamento_autoria.textContent = pensamento.autoria;
    pensamento_autoria.classList.add("pensamento-autoria");

    // append - adicionar os elementos ao item da lista
    li_pensamento.appendChild(icone_aspas);
    li_pensamento.appendChild(pensamento_conteudo);
    li_pensamento.appendChild(pensamento_autoria);
    lista_pensamentos.appendChild(li_pensamento);
  },

  cancelarPensamentoNaLista() {
    const botao_cancelar_pensamento = document.getElementById("botao-cancelar");
    botao_cancelar_pensamento.addEventListener("click", () => {
      document.getElementById("pensamento-conteudo").value = "";
      document.getElementById("pensamento-autoria").value = "";
    });
  },
};

export default user_interface;
