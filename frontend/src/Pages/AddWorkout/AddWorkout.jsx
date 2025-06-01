import React, { useState } from "react";
import "./AddWorkout.css";

function AddWorkout() {
  const [exerciseName, setExerciseName] = useState("");
  const [selectedTreino, setSelectedTreino] = useState("");
  const [exercises, setExercises] = useState([]);

  const exerciciosPorTreino = {
    peito: ["Supino reto", "Supino inclinado", "Crossover", "Crucifixo"],
    costas: ["Puxada frente", "Remada baixa", "Levantamento terra"],
    pernas: ["Agachamento", "Leg press", "Cadeira extensora"],
    ombros: ["Desenvolvimento", "Elevação lateral", "Encolhimento"],
    biceps: ["Rosca direta", "Rosca alternada", "Rosca martelo"],
    triceps: ["Tríceps testa", "Tríceps coice", "Tríceps corda"],
    abdomen: ["Abdominal supra", "Prancha", "Elevação de pernas"],
  };

  const handleTreinoChange = (e) => {
    const treino = e.target.value;
    setSelectedTreino(treino);
    setExercises(exerciciosPorTreino[treino] || []);
    setExerciseName(""); 
  };

  const handleExerciseSelect = (e) => {
    setExerciseName(e.target.value);
  };

  return (
    <div className="add-workout-container">
      <h2 className="add-workout-title">Informações do treino</h2>

      <div className="input-group">
        <label htmlFor="treinoSelect">Selecione o treino:</label>
        <select id="treinoSelect" value={selectedTreino} onChange={handleTreinoChange}>
          <option value="">-- Selecione --</option>
          <option value="peito">Peito</option>
          <option value="costas">Costas</option>
          <option value="pernas">Pernas</option>
          <option value="ombros">Ombros</option>
          <option value="biceps">Bíceps</option>
          <option value="triceps">Tríceps</option>
          <option value="abdomen">Abdômen</option>
        </select>
      </div>

      {exercises.length > 0 && (
        <div className="input-group">
          <label htmlFor="exerciseSelect">Escolha o exercício:</label>
          <select id="exerciseSelect" value={exerciseName} onChange={handleExerciseSelect}>
            <option value="">-- Selecione o exercício --</option>
            {exercises.map((ex, index) => (
              <option key={index} value={ex}>
                {ex}
              </option>
            ))}
          </select>
        </div>
      )}


      <div className="input-group">
        <label htmlFor="setsReps">Séries:</label>
        <input type="number" min={1} id="setsReps" />
      </div>
      <div className="input-group">
        <label htmlFor="reps">Repetições:</label>
        <input type="number" min={1} id="reps" />
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
