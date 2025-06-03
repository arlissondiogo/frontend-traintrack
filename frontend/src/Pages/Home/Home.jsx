import { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [ultimosTreinos, setUltimosTreinos] = useState([]);
  const [exerciciosDisponiveis, setExerciciosDisponiveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatarData = (data) => {
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR");
  };

  useEffect(() => {
    const fetchDados = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const resUltimosTreinos = await fetch(
          "http://localhost:5000/api/workout/list-workout?limit=5",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!resUltimosTreinos.ok) {
          if (resUltimosTreinos.status === 401) {
            console.error("Token inválido ou expirado.");
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            console.error(
              "Erro ao buscar últimos treinos:",
              resUltimosTreinos.status
            );
          }
          return;
        }

        const dataUltimosTreinos = await resUltimosTreinos.json();
        console.log("Dados recebidos da API:", dataUltimosTreinos);

        setUltimosTreinos(dataUltimosTreinos.slice(0, 5));

        const resExercicios = await fetch(
          "http://localhost:5000/api/workout/list-workout",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (resExercicios.ok) {
          const dataExercicios = await resExercicios.json();

          const exerciciosUnicos = [
            ...new Set(
              dataExercicios
                .map((treino) => treino.nomeExercicio)
                .filter((nome) => nome && nome.trim() !== "")
            ),
          ];

          console.log("Exercícios disponíveis:", exerciciosUnicos);
          setExerciciosDisponiveis(exerciciosUnicos);
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, [navigate]);

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-container">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h2>Bem Vindo (a)</h2>
      <div className="dashboard-section">
        <div className="charts">
          <div className="chart-box">
            <Dashboard exerciciosDisponiveis={exerciciosDisponiveis} />
          </div>
        </div>
        <div className="recent-workouts">
          <h3>Últimos treinos adicionados</h3>
          {ultimosTreinos.length === 0 ? (
            <div className="no-workouts">
              <p>Nenhum treino encontrado.</p>
              <p>Comece adicionando seu primeiro treino!</p>
            </div>
          ) : (
            <div className="workouts-list">
              {ultimosTreinos.map((treino, idx) => (
                <div key={treino._id || idx} className="treino-card">
                  <div className="treino-header">
                    <h4 className="exercicio-nome">{treino.nomeExercicio}</h4>
                    {treino.createdAt && (
                      <span className="treino-data">
                        {formatarData(treino.createdAt)}
                      </span>
                    )}
                  </div>

                  <div className="treino-details">
                    {treino.series && treino.repeticoes && (
                      <div className="detail-item">
                        <span className="detail-label">
                          Séries x Repetições:
                        </span>
                        <span className="detail-value">
                          {treino.series}x{treino.repeticoes}
                        </span>
                      </div>
                    )}

                    {treino.carga && treino.carga > 0 && (
                      <div className="detail-item">
                        <span className="detail-label">Peso:</span>
                        <span className="detail-value">{treino.carga}kg</span>
                      </div>
                    )}

                    {treino.tempoDescanso && treino.tempoDescanso > 0 && (
                      <div className="detail-item">
                        <span className="detail-label">Tempo de descanso:</span>
                        <span className="detail-value">
                          {treino.tempoDescanso}s
                        </span>
                      </div>
                    )}

                    {treino.tempoExecucao && treino.tempoExecucao > 0 && (
                      <div className="detail-item">
                        <span className="detail-label">Tempo de execução:</span>
                        <span className="detail-value">
                          {treino.tempoExecucao}s
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
