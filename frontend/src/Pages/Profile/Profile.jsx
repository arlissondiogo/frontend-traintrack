import React from "react";
import "./Profile.css";

export default function Profile() {
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
          <button className="btn grey">Editar informações</button>
          <button className="btn grey">Visualizar histórico de treino</button>
          <button className="btn red">Deletar conta</button>
        </div>
      </main>
    </div>
  );
}
