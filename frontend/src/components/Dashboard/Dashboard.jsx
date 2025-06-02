import { useEffect, useState } from "react";
import ChartProgress from "../ProgressaoCharts/ProgressoChart";

const Dashboard = () => {
  const [progress, setProgress] = useState([]);
  const [volume, setVolume] = useState([]);
  const [userExercises, setUserExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [selectedMounth, setSelectedMounth] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAuthHeaders = () => {
      const token = localStorage.getItem("token");
      return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    };

    const fetchVolume = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/progressao/volume-total`,
          {
            headers: getAuthHeaders(),
          }
        );
        if (res.ok) {
          const data = await res.json();
          setVolume(data);
        } else {
          console.error("Erro ao buscar volume:", res.status);
        }
      } catch (error) {
        console.error("Erro ao buscar volume:", error);
        setError("Erro ao carregar dados de volume");
      }
    };

    const fetchUserExercise = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/workouts/list-workout`,
          {
            headers: getAuthHeaders(),
          }
        );
        if (res.ok) {
          const data = await res.json();
          const exerciciosUnicos = [
            ...new Set(data.map((treino) => treino.nameExercicio)),
          ];
          setUserExercises(exerciciosUnicos);
        } else {
          console.error("Erro ao buscar treinos do usuário:", res.status);
        }
      } catch (error) {
        console.error("Erro ao buscar treinos do usuário:", error);
        setError("Erro ao carregar exercícios do usuário");
      }
    };

    const fetchProgress = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedExercise)
          params.append("exercicio", selectedExercise);
        if (selectedMounth) params.append("mes", selectedMounth);

        const res = await fetch(
          `http://localhost:5000/api/progressao/progresso-carga?${params.toString()}`,
          {
            headers: getAuthHeaders(),
          }
        );
        if (res.ok) {
          const data = await res.json();
          setProgress(data);
        } else {
          console.error("Erro ao buscar progresso:", res.status);
        }
      } catch (error) {
        console.error("Erro ao buscar progresso:", error);
        setError("Erro ao carregar dados de progresso");
      }
    };

    const loadDashboardData = async () => {
      setLoading(true);
      setError(null);

      await Promise.all([
        fetchProgress(),
        fetchVolume(),
        fetchUserExercise(),
      ]);

      setLoading(false);
    };

    loadDashboardData();
  }, [selectedExercise, selectedMounth]);

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Carregando dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>Filtrar por exercício: </label>
        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          style={{ marginRight: "20px", padding: "5px" }}
        >
          <option value="">Todos</option>
          {}
          {userExercises.map((ex, i) => (
            <option key={i} value={ex}>
              {ex}
            </option>
          ))}
        </select>

        <label>Filtrar por mês: </label>
        <select
          value={selectedMounth}
          onChange={(e) => setSelectedMounth(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="">Todos</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {progress.length === 0 && volume.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>
            Nenhum dado encontrado. Adicione alguns treinos para ver os
            gráficos!
          </p>
        </div>
      ) : (
        <ChartProgress progresso={progress} volume={volume} />
      )}
    </div>
  );
};

export default Dashboard;
