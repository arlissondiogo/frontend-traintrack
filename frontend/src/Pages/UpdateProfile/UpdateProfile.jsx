import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    email: "",
    altura: "",
    peso: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userData = data.usuario;

          setFormData({
            nome: userData.nome || "",
            idade: userData.idade?.toString() || "",
            email: userData.email || "",
            altura: userData.altura?.toString() || "",
            peso: userData.peso?.toString() || "",
          });
        } else {
          if (location.state?.userData) {
            const userData = location.state.userData;
            setFormData({
              nome: userData.nome || "",
              idade: userData.idade?.toString() || "",
              email: userData.email || "",
              altura: userData.altura?.toString() || "",
              peso: userData.peso?.toString() || "",
            });
          } else {
            const savedUserData = localStorage.getItem("userData");
            if (savedUserData) {
              const userData = JSON.parse(savedUserData);
              setFormData({
                nome: userData.nome || "",
                idade: userData.idade?.toString() || "",
                email: userData.email || "",
                altura: userData.altura?.toString() || "",
                peso: userData.peso?.toString() || "",
                senha: "",
              });
            }
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        if (location.state?.userData) {
          const userData = location.state.userData;
          setFormData({
            nome: userData.nome || "",
            idade: userData.idade?.toString() || "",
            email: userData.email || "",
            altura: userData.altura?.toString() || "",
            peso: userData.peso?.toString() || "",
          });
        } else {
          const savedUserData = localStorage.getItem("userData");
          if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            setFormData({
              nome: userData.nome || "",
              idade: userData.idade?.toString() || "",
              email: userData.email || "",
              altura: userData.altura?.toString() || "",
              peso: userData.peso?.toString() || "",
            });
          }
        }
      }
    };

    fetchUserData();
  }, [navigate, location.state]);

  const calculateIMC = () => {
    const peso = parseFloat(formData.peso);
    const altura = parseFloat(formData.altura);

    if (peso > 0 && altura > 0) {
      const alturaEmMetros = altura / 100;
      const imc = peso / (alturaEmMetros * alturaEmMetros);
      return imc.toFixed(2);
    }
    return "0";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        peso: parseFloat(formData.peso) || 0,
        altura: parseFloat(formData.altura) || 0,
        idade: parseInt(formData.idade) || 0,
      };

      console.log("Enviando dados:", updateData);

      const response = await fetch(`http://localhost:5000/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      console.log("Resposta da API:", data);

      if (response.ok) {
        console.log("Usuário atualizado com sucesso:", data);

        const updatedUserData = {
          nome: formData.nome,
          email: formData.email,
          peso: data.usuario.peso,
          altura: data.usuario.altura,
          idade: data.usuario.idade,
        };

        localStorage.setItem("userData", JSON.stringify(updatedUserData));

        alert("Perfil atualizado com sucesso!");
        navigate("/perfil");
      } else {
        console.error("Erro na resposta da API:", response.status, data);
        alert(data.erro || "Erro ao atualizar perfil");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro ao conectar com o servidor: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-profile-page">
      <div className="info-form-container">
        <div className="info-box">
          <p>
            <strong>Nome:</strong> {formData.nome || "Não informado"}
          </p>
          <p>
            <strong>Idade:</strong> {formData.idade || "Não informado"}
          </p>
          <p>
            <strong>e-mail:</strong> {formData.email || "Não informado"}
          </p>
          <div className="metrics">
            <div className="metric green">
              <p>Altura</p>
              <p>
                {formData.altura ? `${formData.altura} cm` : "Não informado"}
              </p>
            </div>
            <div className="metric green">
              <p>Peso</p>
              <p>{formData.peso ? `${formData.peso} kg` : "Não informado"}</p>
            </div>
            <div className="metric dark">
              <p>IMC</p>
              <p>{calculateIMC()}</p>
            </div>
          </div>
        </div>

        <div className="form-box">
          <h3>Atualização Cadastral</h3>

          <label>Idade:</label>
          <input
            name="idade"
            type="number"
            min={1}
            max={120}
            value={formData.idade}
            onChange={handleChange}
            placeholder="Digite sua idade"
          />

          <label>Peso (kg):</label>
          <input
            name="peso"
            type="number"
            min={1}
            step="0.1"
            value={formData.peso}
            onChange={handleChange}
            placeholder="Digite seu peso"
          />

          <label>Altura (cm):</label>
          <input
            name="altura"
            value={formData.altura}
            onChange={handleChange}
            type="number"
            min={1}
            max={300}
            placeholder="Digite sua altura"
          />

          <button
            className="btn save-btn"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
