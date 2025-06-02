import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddWorkout.css";

function AddWorkout() {
  const navigate = useNavigate();

  const [exerciseName, setExerciseName] = useState("");
  const [selectedTreino, setSelectedTreino] = useState("");
  const [exercises, setExercises] = useState([]);
  const [series, setSeries] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [load, setLoad] = useState("");
  const [restTime, setTimeRest] = useState("");
  const [runtime, setRuntime] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const exercisesPerWorkout = {
    peito: ["Supino reto", "Supino inclinado", "Crossover", "Crucifixo"],
    costas: ["Puxada frente", "Remada baixa", "Levantamento terra"],
    pernas: ["Agachamento", "Leg press", "Cadeira extensora"],
    ombros: ["Desenvolvimento", "Elevação lateral", "Encolhimento"],
    biceps: ["Rosca direta", "Rosca alternada", "Rosca martelo"],
    triceps: ["Tríceps testa", "Tríceps coice", "Tríceps corda"],
    abdomen: ["Abdominal supra", "Prancha", "Elevação de pernas"],
  };

  const handleTrainingChange = (e) => {
    const training = e.target.value;
    setSelectedTreino(training);
    setExercises(exercisesPerWorkout[training] || []);
    setExerciseName("");
  };

  const handleExerciseSelect = (e) => {
    setExerciseName(e.target.value);
  };

  const timeToSeconds = (timeString) => {
    if (!timeString) return null;
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60;
  };

  const validateForm = () => {
    if (!exerciseName.trim()) {
      setMessage({ text: "Selecione um exercício", type: "error" });
      return false;
    }
    if (!series || series < 1) {
      setMessage({
        text: "Número de séries deve ser maior que 0",
        type: "error",
      });
      return false;
    }
    if (!repetitions || repetitions < 1) {
      setMessage({
        text: "Número de repetições deve ser maior que 0",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage({
          text: "Usuário não autenticado. Faça login novamente.",
          type: "error",
        });
        setLoading(false);
        return;
      }

      const dataToSend = {
        exerciseName: exerciseName.trim(),
        series: parseInt(series),
        repetitions: parseInt(repetitions),
        load: load ? parseFloat(load) : null,
        restTime: timeToSeconds(restTime),
        runtime: timeToSeconds(runtime),
      };

      const response = await fetch(
        "http://localhost:5000/api/workout/add-workout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage({ text: "Treino adicionado com sucesso!", type: "success" });

        setSelectedTreino("");
        setExercises([]);
        setExerciseName("");
        setSeries("");
        setRepetitions("");
        setLoad("");
        setTimeRest("");
        setRuntime("");

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        setMessage({
          text: result.erro || "Erro ao adicionar treino",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Erro ao adicionar treino:", error);
      setMessage({ text: "Erro de conexão. Tente novamente.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-workout-container">
      <h2 className="add-workout-title">Informações do treino</h2>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="treinoSelect">Selecione o treino:</label>
          <select
            id="treinoSelect"
            value={selectedTreino}
            onChange={handleTrainingChange}
            required
          >
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
            <label htmlFor="exerciseSelect">Escolha o exercício: *</label>
            <select
              id="exerciseSelect"
              value={exerciseName}
              onChange={handleExerciseSelect}
              required
            >
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
          <label htmlFor="setsReps">Séries: *</label>
          <input
            type="number"
            min="1"
            id="setsReps"
            value={series}
            onChange={(e) => setSeries(e.target.value)}
            placeholder="Ex: 3"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="reps">Repetições: *</label>
          <input
            type="number"
            min="1"
            id="reps"
            value={repetitions}
            onChange={(e) => setRepetitions(e.target.value)}
            placeholder="Ex: 12"
            required
          />
        </div>

        <div className="row">
          <div className="input-group">
            <label htmlFor="weightUsed">Carga utilizada (kg):</label>
            <input
              type="number"
              min="0"
              id="weightUsed"
              step="0.5"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
              placeholder="Ex: 60"
            />
          </div>
          <div className="input-group">
            <label htmlFor="restTime">Tempo de descanso:</label>
            <input
              type="time"
              id="restTime"
              value={restTime}
              onChange={(e) => setTimeRest(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="executionTime">Tempo de execução:</label>
          <input
            type="time"
            id="executionTime"
            value={runtime}
            onChange={(e) => setRuntime(e.target.value)}
          />
        </div>

        <button type="submit" className="add-button" disabled={loading}>
          {loading ? "Adicionando..." : "Adicionar"}
        </button>
      </form>
    </div>
  );
}

export default AddWorkout;
