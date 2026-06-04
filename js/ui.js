import api from "./api.js";

let user_interface = {
  async renderizarPensamentos() {
    const lista_pensamentos = document.getElementById("lista-pensamentos");

    try {
      const pensamentos = await api.buscarPensamentos();
      pensamentos.forEach((pensamento) => {
        lista_pensamentos.innerHTML += `<li class="li-pensamento" data-id="${pensamento.id}">
          <img src="img/aspas-azuis.png" alt="Aspas azuis" class="icone-aspas">
          <div class="pensamento-conteudo">${pensamento.conteudo}</div>
          <div class="pensamento-autoria">${pensamento.autoria}</div>
          </li>`;
      });
    } catch (error) {
      alert("Erro ao renderizar pensamentos.");
    }
  },
};

export default user_interface;
