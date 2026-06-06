import api from "./api.js";

let user_interface = {
  async preencherFormulario(pensamento_id) {
    const pensamento = await api.buscarPensamentoPorId(pensamento_id);
    document.getElementById("pensamento-id").value = pensamento.id;
    document.getElementById("pensamento-conteudo").value = pensamento.conteudo;
    document.getElementById("pensamento-autoria").value = pensamento.autoria;
  },

  async renderizarPensamentos() {
    const lista_pensamentos = document.getElementById("lista-pensamentos");
    lista_pensamentos.innerHTML = "";

    try {
      const pensamentos = await api.buscarPensamentos();

      if (pensamentos.length == 0) {
        // criação de uma constante "mensagem", caso não haja nenhum pensamento cadastrado no projeto
        const mensagem_vazia = document.createElement("p");
        mensagem_vazia.textContent =
          "Nada por aqui ainda, que tal compartilhar alguma ideia?";
        mensagem_vazia.classList.add("lista-vazia-mensagem");
        lista_pensamentos.appendChild(mensagem_vazia);

        // criação da imagem de uma gaveta vazia - quando não há pensamentos
        const imagem_sem_pensamentos = document.createElement("img");
        imagem_sem_pensamentos.src = "img/lista-vazia.png";
        imagem_sem_pensamentos.alt = "Gaveta vazia";
        lista_pensamentos.appendChild(imagem_sem_pensamentos);
        imagem_sem_pensamentos.classList.add("lista-vazia-imagem");
      } else {
        pensamentos.forEach(user_interface.adicionarPensamentoNaLista);
      }
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

    // criação do botão para editar um pensamento
    const botao_editar_pensamento = document.createElement("button");
    botao_editar_pensamento.classList.add("botao-editar");
    // quando clicarmos no botão, queremos que o formulário seja preenchido com os dados do pensamento
    botao_editar_pensamento.onclick = () =>
      user_interface.preencherFormulario(pensamento.id);

    // adicionando o ícone de editar com a imagem
    const icone_editar = document.createElement("img");
    icone_editar.src = "img/icone-editar.png";
    icone_editar.alt = "Editar";
    // anexando o ícone ao botão com append child
    botao_editar_pensamento.appendChild(icone_editar);

    // criação da estrutura do botão para deletar um pensamento
    const botao_excluir_pensamento = document.createElement("button");
    botao_excluir_pensamento.classList.add("botao-excluir");
    botao_excluir_pensamento.onclick = async () => {
      try {
        await api.excluirPensamento(pensamento.id);
        user_interface.renderizarPensamentos();
      } catch (error) {
        alert("Erro ao excluir pensamento!");
      }
    };

    // adicionando o ícone de excluir com a imagem
    const icone_excluir = document.createElement("img");
    icone_excluir.src = "img/icone-excluir.png";
    icone_excluir.alt = "Excluir";
    // anexando o ícone ao botão com append child
    botao_excluir_pensamento.appendChild(icone_excluir);

    // criação de uma div que irá conter o botão de editar e o botão de excluir
    const icones = document.createElement("div");
    icones.classList.add("icones");
    icones.appendChild(botao_editar_pensamento);
    icones.appendChild(botao_excluir_pensamento);

    // append - adicionar os elementos ao item da lista
    li_pensamento.appendChild(icone_aspas);
    li_pensamento.appendChild(pensamento_conteudo);
    li_pensamento.appendChild(pensamento_autoria);
    li_pensamento.appendChild(icones);
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
