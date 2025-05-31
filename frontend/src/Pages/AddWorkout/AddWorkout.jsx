import React, { useState } from "react";
import "./AddWorkout.css";

function AddWorkout() {
  const [exerciseName, setExerciseName] = useState("");

  const handleExerciseNameChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
    setExerciseName(filteredValue);
  };

  return (
    <div className="add-workout-container">
      <h2 className="add-workout-title">Informações do treino</h2>
      <div className="input-group">
        <label htmlFor="exerciseName">Nome do exercício:</label>
        <input
          type="text"
          id="exerciseName"
          value={exerciseName}
          onChange={handleExerciseNameChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="setsReps">Séries:</label>
        <input type="number" min={1} id="setsReps" />
      </div>
      <div className="input-group">
        <label htmlFor="setsReps2">Repetições:</label>
        <input type="number" min={1} id="setsReps" />
      </div>
      <div className="row">
        <div className="input-group">
          <label htmlFor="weightUsed">Carga utilizada (kg):</label>
          <input type="number" min={1} id="weightUsed" step="any" />
        </div>
        <div className="input-group">
          <label htmlFor="restTime">Tempo de descanso:</label>
          <input type="time" id="restTime" />
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="executionTime">Tempo de execução:</label>
        <input type="time" id="executionTime" />
      </div>
      <button className="add-button">Adicionar</button>
    </div>
  );
}

export default AddWorkout;
