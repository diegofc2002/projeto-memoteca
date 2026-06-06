const url_base = "http://localhost:3000";

let api = {
  async buscarPensamentos() {
    try {
      let response = await fetch(`${url_base}/pensamentos`);
      return await response.json();
    } catch {
      alert("Erro ao buscar pensamentos!");
      throw error;
    }
  },

  async salvarPensamento(pensamento) {
    try {
      let response = await fetch(`${url_base}/pensamentos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pensamento),
      });
      return await response.json();
    } catch {
      alert("Erro ao salvar pensamento!");
      throw error;
    }
  },

  async buscarPensamentoPorId(id) {
    try {
      let response = await fetch(`${url_base}/pensamentos/${id}`);
      return await response.json();
    } catch {
      alert("Erro ao buscar pensamento!");
      throw error;
    }
  },

  async editarPensamento(pensamento) {
    try {
      let response = await fetch(`${url_base}/pensamentos/${pensamento.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pensamento),
      });
      return await response.json();
    } catch {
      alert("Erro ao editar pensamento!");
      throw error;
    }
  },

  async excluirPensamento(id) {
    try {
      let response = await fetch(`${url_base}/pensamentos/${id}`, {
        method: "DELETE",
      });
    } catch {
      alert("Erro ao excluir pensamento!");
      throw error;
    }
  },
};

export default api;
