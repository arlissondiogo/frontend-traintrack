import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Importa o hook
import "./Profile.css";
import DeleteAccountModal from "../../components/DeleteAccountModal/DeleteAccountModal.jsx";

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // <-- Inicializa o hook

  const handleDelete = () => {
    // Aqui faz a chamada para deletar a conta na API
    console.log("Conta deletada");

    // Fecha o modal
    setIsModalOpen(false);

    // Limpa dados de autenticação, se tiver
    localStorage.removeItem("token");

    // Redireciona para a página de login
    navigate("/login");
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
          <button className="btn grey">Visualizar histórico de treino</button>
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
