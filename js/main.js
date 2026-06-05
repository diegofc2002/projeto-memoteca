import user_interface from "./ui.js";
import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  user_interface.renderizarPensamentos();
  user_interface.cancelarPensamentoNaLista();

  const formulario_pensamento = document.getElementById("pensamento-form");
  formulario_pensamento.addEventListener(
    "submit",
    manipularSubmissaoDoFormulario,
  );
});

// (event) = evento de submissão do formulário
async function manipularSubmissaoDoFormulario(event) {
  event.preventDefault();
  const id = document.getElementById("pensamento-id").value;
  const conteudo = document.getElementById("pensamento-conteudo").value;
  const autoria = document.getElementById("pensamento-autoria").value;

  try {
    await api.salvarPensamento({ conteudo, autoria });
    user_interface.renderizarPensamentos();
  } catch (error) {
    alert("Erro ao salvar o pensamento.");
  }
}
