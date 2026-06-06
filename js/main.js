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
    // caso haja um id, queremos editar o pensamento; senão, salvamos o pensamento
    if (id) {
      await api.editarPensamento({ id, conteudo, autoria });
    } else {
      await api.salvarPensamento({ conteudo, autoria });
    }
    user_interface.renderizarPensamentos();
  } catch (error) {
    alert("Erro ao salvar o pensamento.");
  }
}
