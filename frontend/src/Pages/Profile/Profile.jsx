import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import DeleteAccountModal from "../../components/DeleteAccountModal/DeleteAccountModal.jsx";

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split(".")[1])).id;

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/deleteUsers/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Conta deletada com sucesso:", data);
        localStorage.clear();
        setIsModalOpen(false);
        navigate("/login");
      } else {
        console.error("Erro na resposta da API:", response.status, data);
        alert(data.erro || "Erro ao deletar conta");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro ao deletar conta");
    }
  };

  return (
    <div className="profile-page">
      <main className="profile-main">
        <div className="info-box">
          <div className="user-info">
            <p>
              <strong>Nome:</strong> Arlisson Diogo
            </p>
            <p>
              <strong>Idade:</strong> 23
            </p>
            <p>
              <strong>e-mail:</strong> a@gmail.com
            </p>
          </div>
          <div className="metrics">
            <div className="metric green">
              <p>Altura</p>
              <p>175 cm</p>
            </div>
            <div className="metric green">
              <p>Peso</p>
              <p>91 kg</p>
            </div>
            <div className="metric dark">
              <p>IMC</p>
              <p>26,59</p>
            </div>
          </div>
        </div>

        <div className="actions-box">
          <button className="btn grey" onClick={() => navigate("/editar-user")}>
            Editar informações
          </button>
          <button className="btn grey" onClick={() => navigate("/historico")}>
            Visualizar histórico de treino
          </button>
          <button className="btn red" onClick={() => setIsModalOpen(true)}>
            Deletar conta
          </button>
        </div>
      </main>

      <DeleteAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
