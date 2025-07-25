import { useEffect, useState } from "react";
import ProgressoChart from "../ProgressaoCharts/ProgressoChart";

const Dashboard = () => {
  const [progresso, setProgresso] = useState([]);
  const [volume, setVolume] = useState([]);
  const [exerciciosUsuario, setExerciciosUsuario] = useState([]);
  const [exercicioSelecionado, setExercicioSelecionado] = useState("Todos");
  const [mesSelecionado, setMesSelecionado] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const fetchVolume = async () => {
    try {
      const params = new URLSearchParams();
      if (exercicioSelecionado && exercicioSelecionado !== "Todos") {
        params.append("exercicio", exercicioSelecionado);
      }
      if (mesSelecionado && mesSelecionado !== "Todos") {
        params.append("mes", mesSelecionado);
      }

      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/progressao/volume-total?${params.toString()}`,
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

  const fetchExerciciosUsuario = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/progressao/exercicios-unicos`,
        {
          headers: getAuthHeaders(),
        }
      );
      if (res.ok) {
        const data = await res.json();
        setExerciciosUsuario(data);
      } else {
        console.error("Erro ao buscar exercícios únicos:", res.status);
      }
    } catch (error) {
      console.error("Erro ao buscar exercícios únicos:", error);
      setError("Erro ao carregar exercícios do usuário");
    }
  };

  const fetchProgresso = async () => {
    try {
      const params = new URLSearchParams();
      if (exercicioSelecionado && exercicioSelecionado !== "Todos") {
        params.append("exercicio", exercicioSelecionado);
      }
      if (mesSelecionado && mesSelecionado !== "Todos") {
        params.append("mes", mesSelecionado);
      }

      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/progressao/progresso-carga?${params.toString()}`,
        {
          headers: getAuthHeaders(),
        }
      );
      if (res.ok) {
        const data = await res.json();
        setProgresso(data);
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
      fetchProgresso(),
      fetchVolume(),
      fetchExerciciosUsuario(),
    ]);

    setLoading(false);
  };

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercicioSelecionado, mesSelecionado]);

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
          value={exercicioSelecionado}
          onChange={(e) => setExercicioSelecionado(e.target.value)}
          style={{ marginRight: "20px", padding: "5px" }}
        >
          <option value="Todos">Todos</option>
          {exerciciosUsuario.map((ex, i) => (
            <option key={i} value={ex}>
              {ex}
            </option>
          ))}
        </select>

        <label>Filtrar por mês: </label>
        <select
          value={mesSelecionado}
          onChange={(e) => setMesSelecionado(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="Todos">Todos</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {progresso.length === 0 && volume.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>
            Nenhum dado encontrado. Adicione alguns treinos para ver os
            gráficos!
          </p>
        </div>
      ) : (
        <ProgressoChart progresso={progresso} volume={volume} />
      )}
    </div>
  );
};

export default Dashboard;
