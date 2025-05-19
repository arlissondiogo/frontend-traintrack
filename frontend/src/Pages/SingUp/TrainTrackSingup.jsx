import React, { useState, useEffect } from "react";
import "./TrainTrackSingup.css";

const TrainTrackSignup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [disableGenerate, setDisableGenerate] = useState(false);

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let generated = "";
    for (let i = 0; i < 12; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);

    // Bloqueia botão por 2 segundos
    setDisableGenerate(true);
    setTimeout(() => setDisableGenerate(false), 20000);
  };

  useEffect(() => {
    generatePassword();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Signup submitted", { fullName, email, password });
  };

  return (
    <div className="traintrack-signup-container">
      <div className="signup-wrapper">
        <div className="signup-form">
          <h2>Cadastre-se</h2>
          <div className="form-group">
            <label htmlFor="fullName">Nome Completo:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <div
              className="password-container"
              style={{ display: "flex", gap: "8px", alignItems: "center" }}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                readOnly
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🔒" : "👁️"}
              </button>
              <button
                type="button"
                className="generate-password-btn"
                onClick={generatePassword}
                disabled={disableGenerate}
              >
                {disableGenerate ? "Aguarde..." : "Gerar senha"}
              </button>
            </div>
          </div>
          <button type="button" className="signup-btn" onClick={handleSubmit}>
            Cadastrar
          </button>
          <div className="login-link">
            Possui uma conta? <a href="/login">Entre</a>
          </div>
        </div>
        <div className="signup-illustration">
          <img src="/pic-singup.png" alt="TrainTrack Signup Illustration" />
        </div>
      </div>
    </div>
  );
};

export default TrainTrackSignup;
