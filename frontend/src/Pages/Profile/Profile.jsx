import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import DeleteAccountModal from "../../components/DeleteAccountModal/DeleteAccountModal.jsx";

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    nome: "",
    idade: 0,
    email: "",
    altura: 0,
    peso: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const userData = data.usuario;

          setUserData({
            nome: userData.nome,
            idade: userData.idade,
            email: userData.email,
            altura: userData.altura,
            peso: userData.peso,
          });

          localStorage.setItem(
            "userData",
            JSON.stringify({
              nome: userData.nome,
              idade: userData.idade,
              email: userData.email,
              altura: userData.altura,
              peso: userData.peso,
            })
          );
        } else {
          const savedUserData = localStorage.getItem("userData");
          if (savedUserData) {
            setUserData(JSON.parse(savedUserData));
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        const savedUserData = localStorage.getItem("userData");
        if (savedUserData) {
          setUserData(JSON.parse(savedUserData));
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const calculateIMC = () => {
    if (userData.peso > 0 && userData.altura > 0) {
      const alturaEmMetros = userData.altura / 100;
      const imc = userData.peso / (alturaEmMetros * alturaEmMetros);
      return imc.toFixed(2);
    }
    return "0";
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split(".")[1])).id;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Conta deletada com sucesso:", data);
        localStorage.clear();
        setIsModalOpen(false);
        navigate("/login");
      } else {
        console.error("Erro na resposta da API:", response.status, data);
        alert(data.erro || "Erro ao deletar conta");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro ao deletar conta");
    }
  };

  if (loading) {
    return <div className="profile-page">Carregando...</div>;
  }

  return (
    <div className="profile-page">
      <main className="profile-main">
        <div className="info-box">
          <div className="user-info">
            <p>
              <strong>Nome:</strong> {userData.nome || "Não informado"}
            </p>
            <p>
              <strong>Idade:</strong> {userData.idade || "Não informado"}
            </p>
            <p>
              <strong>e-mail:</strong> {userData.email || "Não informado"}
            </p>
          </div>
          <div className="metrics">
            <div className="metric green">
              <p>Altura</p>
              <p>
                {userData.altura > 0
                  ? `${userData.altura} cm`
                  : "Não informado"}
              </p>
            </div>
            <div className="metric green">
              <p>Peso</p>
              <p>
                {userData.peso > 0 ? `${userData.peso} kg` : "Não informado"}
              </p>
            </div>
            <div className="metric dark">
              <p>IMC</p>
              <p>{calculateIMC()}</p>
            </div>
          </div>
        </div>

        <div className="actions-box">
          <button
            className="btn grey"
            onClick={() => navigate("/editar-user", { state: { userData } })}
          >
            Editar informações
          </button>
          <button className="btn grey" onClick={() => navigate("/historico")}>
            Visualizar histórico de treino
          </button>
          <button className="btn red" onClick={() => setIsModalOpen(true)}>
            Deletar conta
          </button>
        </div>
      </main>

      <DeleteAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
