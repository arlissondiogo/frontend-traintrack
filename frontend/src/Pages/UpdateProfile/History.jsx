import React, { useState } from "react";
import "./History.css";

export default function History() {
  const [trainingHistory, setTrainingHistory] = useState([
    { id: 1, date: "30/05/2025", description: "Treino de pernas", duration: "1h" },
    {
      id: 2,
      date: "29/05/2025",
      description: "Treino de braços",
      duration: "45min",
    },
    {
      id: 3,
      date: "28/05/2025",
      description: "Treino de cardio",
      duration: "30min",
    },
  ]);

  const [trainingToDelete, setTrainingToDelete] = useState(null);

  const handleDelete = (id) => {
    const newList = trainingHistory.filter((training) => training.id !== id);
    setTrainingHistory(newList);
    setTrainingToDelete(null);
  };

  return (
    <div className="history-container">
      <h1 className="history-title">Histórico de Treinos</h1>

      {trainingHistory.map((training) => (
        <div className="history-card" key={training.id}>
          <div className="history-content">
            <div className="history-box">Data: {training.date}</div>
            <div className="history-box">Descrição: {training.description}</div>
            <div className="history-box">Duração: {training.duration}</div>
          </div>

          <div className="history-buttons">
            <button
              className="history-btn-delete"
              onClick={() => setTrainingToDelete(training.id)}
            >
              Deletar
            </button>
            <button className="history-btn-edit">Modificar treino</button>
          </div>
        </div>
      ))}

      {/* MODAL DE CONFIRMAÇÃO */}
      {trainingToDelete !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <p className="modal-text">
              Você tem certeza que deseja deletar seu treino?
            </p>
            <div className="modal-buttons">
              <button
                className="modal-no"
                onClick={() => setTrainingToDelete(null)}
              >
                Não
              </button>
              <button
                className="modal-yes"
                onClick={() => handleDelete(trainingToDelete)}
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
