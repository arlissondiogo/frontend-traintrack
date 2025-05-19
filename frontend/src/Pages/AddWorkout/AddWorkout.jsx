import React from "react";
import "./AddWorkout.css";

function AddWorkout() {
  return (
    <div className="add-workout-container">
      <h2 className="add-workout-title">Informações do treino</h2>
      <div className="input-group">
        <label htmlFor="exerciseName">Nome do exercício:</label>
        <input type="text" id="exerciseName" />
      </div>
      <div className="input-group">
        <label htmlFor="setsReps">Séries e repetições:</label>
        <input type="text" id="setsReps" />
      </div>
      <div className="row">
        <div className="input-group">
          <label htmlFor="weightUsed">Carga utilizada:</label>
          <input type="text" id="weightUsed" />
        </div>
        <div className="input-group">
          <label htmlFor="restTime">Tempo de descanso:</label>
          <input type="text" id="restTime" />
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="executionTime">Tempo de execução:</label>
        <input type="text" id="executionTime" />
      </div>
      <button className="add-button">Adicionar</button>
    </div>
  );
}

export default AddWorkout;