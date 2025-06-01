import { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [ultimosTreinos, setUltimosTreinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUltimosTreinos = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Corrigir a URL da API - estava com 'list-workouts' mas deveria ser 'list-workout'
        const res = await fetch(
          "http://localhost:5000/api/workouts/list-workout?limit=5",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          if (res.status === 401) {
            console.error("Token inválido ou expirado.");
            localStorage.removeItem("token"); // Limpar token inválido
            navigate("/login");
          } else {
            console.error("Erro ao buscar últimos treinos:", res.status);
          }
          return;
        }

        const data = await res.json();
        console.log("Dados recebidos da API:", data);
        setUltimosTreinos(data.slice(0, 5));
      } catch (error) {
        console.error("Erro de conexão:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUltimosTreinos();
  }, [navigate]);

  if (loading) {
    return (
      <div className="home-container">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h2>Bem Vindo (a)</h2>
      <div className="dashboard-section">
        <div className="charts">
          <div className="chart-box">
            <Dashboard />
          </div>
        </div>
        <div className="recent-workouts">
          <h3>Últimos treinos adicionados</h3>
          {ultimosTreinos.length === 0 ? (
            <p>Nenhum treino encontrado.</p>
          ) : (
            ultimosTreinos.map((treino, idx) => (
              <div key={treino._id || idx} className="treino-card">
                <div>
                  <strong>Exercício:</strong> {treino.nomeExercicio}
                </div>
                <div>
                  <strong>Séries e repetições:</strong> {treino.series || 0}x
                  {treino.repeticoes || 0}
                </div>
                <div>
                  <strong>Peso:</strong> {treino.carga || 0}kg
                </div>
                <div>
                  <strong>Descanso:</strong> {treino.tempoDescanso || 0}s
                </div>
                {treino.tempoExecucao && (
                  <div>
                    <strong>Tempo de execução:</strong> {treino.tempoExecucao}s
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
