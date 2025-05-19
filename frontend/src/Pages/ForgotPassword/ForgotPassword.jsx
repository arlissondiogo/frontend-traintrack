import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // Instancia o hook

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleEnviarEmail = () => {
    // Logic for sending recovery email
    console.log("Enviando email para:", email);
  };

  const handleVoltarLogin = () => {
    navigate("/login");
  };

  return (
    <div className="recovery-container">
      <div className="recovery-content">
        <div className="left-section">
          <div className="logo-container">
            <img
              src="/public/logo.png"
              alt="TrainTrack Logo"
              className="logo"
            />
            <h1 className="logo-text">TrainTrack</h1>
          </div>

          <div
            className="back-link"
            onClick={handleVoltarLogin}
            style={{ cursor: "pointer" }}
          >
            <span className="back-arrow">&#8592;</span>
            <span>Voltar ao Login</span>
          </div>

          <h2 className="recovery-title">Recuperar senha</h2>

          <form onSubmit={handleSubmit} className="recovery-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="form-input"
              />
            </div>

            <button
              type="button"
              className="email-button"
              onClick={handleEnviarEmail}
            >
              Enviar e-mail
            </button>

            <div className="form-group">
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={handleSenhaChange}
                className="form-input"
              />
            </div>

            <button type="submit" className="submit-button">
              Entrar
            </button>
          </form>
        </div>

        <div className="right-section">
          <img
            src="/forgot-pass.png"
            alt="Person exercising"
            className="recovery-image"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
