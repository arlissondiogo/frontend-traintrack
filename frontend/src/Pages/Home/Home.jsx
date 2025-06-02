import { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [lastTraining, setLastTraining] = useState([]);
  const [exercisesAvailable, setexercisesAvailable] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const resLastTrainings = await fetch(
          "http://localhost:5000/api/workouts/list-workout?limit=5",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!resLastTrainings.ok) {
          if (resLastTrainings.status === 401) {
            console.error("Token inválido ou expirado.");
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            console.error(
              "Erro ao buscar últimos treinos:",
              resLastTrainings.status
            );
          }
          return;
        }

        const lastTrainingData = await resLastTrainings.json();
        console.log("Dados recebidos da API:", lastTrainingData);
        setLastTraining(lastTrainingData.slice(0, 5));

        const resExercises = await fetch(
          "http://localhost:5000/api/workouts/list-workout",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (resExercises.ok) {
          const dataExercises = await resExercises.json();

          const uniqueExercises = [
            ...new Set(
              dataExercises
                .map((training) => training.exerciseName)
                .filter((name) => name && name.trim() !== "")
            ),
          ];

          console.log("Exercícios disponíveis:", uniqueExercises);
          setexercisesAvailable(uniqueExercises);
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
            <Dashboard exercisesAvailable={exercisesAvailable} />
          </div>
        </div>
        <div className="recent-workouts">
          <h3>Últimos treinos adicionados</h3>
          {lastTraining.length === 0 ? (
            <p>Nenhum treino encontrado.</p>
          ) : (
            lastTraining.map((training, idx) => (
              <div key={training._id || idx} className="treino-card">
                <div>
                  <strong>Exercício:</strong> {training.nomeExercicio}
                </div>
                <div>
                  <strong>Séries e repetições:</strong> {training.series || 0}x
                  {training.repetitions || 0}
                </div>
                <div>
                  <strong>Peso:</strong> {training.load || 0}kg
                </div>
                <div>
                  <strong>Descanso:</strong> {training.restTime || 0}s
                </div>
                {training.runTime && (
                  <div>
                    <strong>Tempo de execução:</strong> {training.runTime}
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
