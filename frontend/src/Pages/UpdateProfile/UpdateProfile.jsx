import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "Arlisson Diogo",
    idade: "21",
    email: "a@gmail.com",
    altura: "185",
    peso: "91",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Dados atualizados:", formData);
    navigate("/perfil"); 
  };

  return (
    <div className="update-profile-page">
      <div className="info-form-container">
        <div className="info-box">
          <p>
            <strong>Nome:</strong> {formData.nome}
          </p>
          <p>
            <strong>Idade:</strong> {formData.idade}
          </p>
          <p>
            <strong>e-mail:</strong> {formData.email}
          </p>
          <div className="metrics">
            <div className="metric green">
              <p>Altura</p>
              <p>{formData.altura} cm</p>
            </div>
            <div className="metric green">
              <p>Peso</p>
              <p>{formData.peso} kg</p>
            </div>
            <div className="metric dark">
              <p>IMC</p>
              <p>{/*aqui vai algo*/ "5000"}</p>
            </div>
          </div>
        </div>

        <div className="form-box">
          <h3>Atualização Cadastral</h3>
          <label>Nome:</label>
          <input name="nome" value={formData.nome} onChange={handleChange} />

          <label>Idade:</label>
          <input name="idade" value={formData.idade} onChange={handleChange} />

          <label>Peso:</label>
          <input name="peso" value={formData.peso} onChange={handleChange} />

          <label>Altura:</label>
          <input
            name="altura"
            value={formData.altura}
            onChange={handleChange}
          />

          <button className="btn save-btn" onClick={handleSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}