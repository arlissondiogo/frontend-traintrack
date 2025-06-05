import { useState, useEffect } from "react";
import "./History.css";

export default function History() {
  const [treinoHistorico, setTreinoHistorico] = useState([]);
  const [treinoParaDeletar, setTreinoParaDeletar] = useState(null);
  const [treinoParaEditar, setTreinoParaEditar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 5,
  });

  const [editForm, setEditForm] = useState({
    nomeExercicio: "",
    series: "",
    repeticoes: "",
    carga: "",
    tempoDescanso: "",
    tempoExecucao: "",
  });

  const secondsToTime = (seconds) => {
    if (!seconds) return "";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    } else {
      return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
  };

  const timeToSeconds = (timeString) => {
    if (!timeString) return null;
    const parts = timeString.split(":").map(Number);

    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      return minutes * 60 + seconds;
    } else if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      return hours * 3600 + minutes * 60 + seconds;
    }

    return null;
  };

  const formatTimeForDisplay = (seconds) => {
    if (!seconds) return "0s";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    let result = "";
    if (hours > 0) result += `${hours}h`;
    if (minutes > 0) result += `${minutes}min`;
    if (secs > 0) result += `${secs}s`;

    return result || "0s";
  };

  const loadWorkouts = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage({
          text: "Usuário não autenticado. Faça login novamente.",
          type: "error",
        });
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/workout/list-workout?page=${page}&limit=${pagination.limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setTreinoHistorico(result.workouts);
        setPagination({
          page: result.page,
          pages: result.pages,
          total: result.total,
          limit: pagination.limit,
        });
      } else {
        setMessage({
          text: result.erro || "Erro ao carregar histórico",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Erro ao carregar treinos:", error);
      setMessage({
        text: "Erro de conexão. Tente novamente.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/workout/delete-workout/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage({
          text: "Treino deletado com sucesso!",
          type: "success",
        });
        loadWorkouts(pagination.page);
      } else {
        setMessage({
          text: result.erro || "Erro ao deletar treino",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Erro ao deletar treino:", error);
      setMessage({
        text: "Erro de conexão. Tente novamente.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTreinoParaDeletar(null);
    }
  };

  const handleEditStart = (treino) => {
    setTreinoParaEditar(treino._id);
    setEditForm({
      nomeExercicio: treino.nomeExercicio,
      series: treino.series.toString(),
      repeticoes: treino.repeticoes.toString(),
      carga: treino.carga ? treino.carga.toString() : "",
      tempoDescanso: secondsToTime(treino.tempoDescanso),
      tempoExecucao: secondsToTime(treino.tempoExecucao),
    });
  };

  const handleEditSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const dataToSend = {
        nomeExercicio: editForm.nomeExercicio.trim(),
        series: parseInt(editForm.series),
        repeticoes: parseInt(editForm.repeticoes),
        carga: editForm.carga ? parseFloat(editForm.carga) : null,
        tempoDescanso: timeToSeconds(editForm.tempoDescanso),
        tempoExecucao: timeToSeconds(editForm.tempoExecucao),
      };

      const response = await fetch(
        `http://localhost:5000/api/workout/update-workout/${treinoParaEditar}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage({
          text: "Treino atualizado com sucesso!",
          type: "success",
        });
        // Recarregar a lista
        loadWorkouts(pagination.page);
        setTreinoParaEditar(null);
      } else {
        setMessage({
          text: result.erro || "Erro ao atualizar treino",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar treino:", error);
      setMessage({
        text: "Erro de conexão. Tente novamente.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      loadWorkouts(newPage);
    }
  };

  return (
    <div className="history-container">
      <h1 className="history-title">Histórico de Exercícios</h1>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {loading && <div className="loading">Carregando...</div>}

      {treinoHistorico.length === 0 && !loading ? (
        <div className="no-workouts">Nenhum treino encontrado.</div>
      ) : (
        treinoHistorico.map((treino) => (
          <div className="history-card" key={treino._id}>
            {treinoParaEditar === treino._id ? (
              // Formulário de edição
              <div className="edit-form">
                <div className="input-group">
                  <label>Exercício:</label>
                  <input type="text" value={editForm.nomeExercicio} disabled />
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Séries:</label>
                    <input
                      type="number"
                      min="1"
                      value={editForm.series}
                      onChange={(e) =>
                        setEditForm({ ...editForm, series: e.target.value })
                      }
                    />
                  </div>
                  <div className="input-group">
                    <label>Repetições:</label>
                    <input
                      type="number"
                      min="1"
                      value={editForm.repeticoes}
                      onChange={(e) =>
                        setEditForm({ ...editForm, repeticoes: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Carga (kg):</label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={editForm.carga}
                      onChange={(e) =>
                        setEditForm({ ...editForm, carga: e.target.value })
                      }
                    />
                  </div>
                  <div className="input-group">
                    <label>Tempo Descanso:</label>
                    <input
                      type="time"
                      value={editForm.tempoDescanso}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          tempoDescanso: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>Tempo Execução:</label>
                  <input
                    type="time"
                    value={editForm.tempoExecucao}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        tempoExecucao: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="edit-buttons">
                  <button
                    className="save-btn"
                    onClick={handleEditSave}
                    disabled={loading}
                  >
                    Salvar
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setTreinoParaEditar(null)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="history-content">
                  <div className="history-box">
                    Exercício: {treino.nomeExercicio}
                  </div>
                  <div className="history-box">Séries: {treino.series}</div>
                  <div className="history-box">
                    Repetições: {treino.repeticoes}
                  </div>
                  <div className="history-box">
                    Carga:{" "}
                    {treino.carga ? `${treino.carga}kg` : "Não informado"}
                  </div>
                  <div className="history-box">
                    Tempo de Descanso:{" "}
                    {formatTimeForDisplay(treino.tempoDescanso)}
                  </div>
                  <div className="history-box">
                    Tempo de Execução:{" "}
                    {formatTimeForDisplay(treino.tempoExecucao)}
                  </div>
                  <div className="history-box">
                    Data:{" "}
                    {new Date(treino.createdAt).toLocaleDateString("pt-BR")}
                  </div>
                </div>

                <div className="history-buttons">
                  <button
                    className="history-btn-delete"
                    onClick={() => setTreinoParaDeletar(treino._id)}
                    disabled={loading}
                  >
                    Deletar
                  </button>
                  <button
                    className="history-btn-edit"
                    onClick={() => handleEditStart(treino)}
                    disabled={loading}
                  >
                    Modificar exercício
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}

      {pagination.pages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1 || loading}
            className="pagination-btn"
          >
            Anterior
          </button>
          <span className="pagination-info">
            Página {pagination.page} de {pagination.pages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages || loading}
            className="pagination-btn"
          >
            Próxima
          </button>
        </div>
      )}

      {treinoParaDeletar !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <p className="modal-text">
              Você tem certeza que deseja deletar este exercício?
            </p>
            <div className="modal-buttons">
              <button
                className="modal-no"
                onClick={() => setTreinoParaDeletar(null)}
                disabled={loading}
              >
                Não
              </button>
              <button
                className="modal-yes"
                onClick={() => handleDelete(treinoParaDeletar)}
                disabled={loading}
              >
                {loading ? "Deletando..." : "Deletar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
