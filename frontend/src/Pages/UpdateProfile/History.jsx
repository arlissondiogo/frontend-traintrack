import React, { useState } from "react";
import "./History.css";

export default function History() {
  const [treinoHistorico, setTreinoHistorico] = useState([
    { id: 1, data: "30/05/2025", descricao: "Treino de pernas", duracao: "1h" },
    {
      id: 2,
      data: "29/05/2025",
      descricao: "Treino de braços",
      duracao: "45min",
    },
    {
      id: 3,
      data: "28/05/2025",
      descricao: "Treino de cardio",
      duracao: "30min",
    },
  ]);

  const handleDelete = (id) => {
    const novaLista = treinoHistorico.filter((treino) => treino.id !== id);
    setTreinoHistorico(novaLista);
  };

  return (
    <div className="history-container">
      <h1 className="history-title">Histórico de Treinos</h1>

      {treinoHistorico.map((treino) => (
        <div className="history-card" key={treino.id}>
          <div className="history-content">
            <div className="history-box">Data: {treino.data}</div>
            <div className="history-box">Descrição: {treino.descricao}</div>
            <div className="history-box">Duração: {treino.duracao}</div>
          </div>

          <div className="history-buttons">
            <button
              className="history-btn-delete"
              onClick={() => handleDelete(treino.id)}
            >
              Deletar
            </button>
            <button className="history-btn-edit">Modificar treino</button>
          </div>
        </div>
      ))}
    </div>
  );
}
