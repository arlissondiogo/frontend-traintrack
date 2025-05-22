import React, { useState } from "react";
import "./TrainTrackSingup.css";
import { useNavigate } from "react-router-dom";

const TrainTrackSignup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [disableGenerate, setDisableGenerate] = useState(false);
  const navigate = useNavigate();

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let generated = "";
    for (let i = 0; i < 15; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);

    setDisableGenerate(true);
    setTimeout(() => setDisableGenerate(false), 20000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password) {
      alert("Por favor, gere uma senha antes de cadastrar.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: fullName,
          email,
          senha: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.erro || "Erro no cadastro.");
        return;
      }

      alert(
        `Usuário cadastrado com sucesso! Sua senha é: ${data.usuario.senha}`
      );

      navigate("/login");
    } catch {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="traintrack-signup-container">
      <div className="signup-wrapper">
        <div className="signup-form">
          <h2>Cadastre-se</h2>
          <form onSubmit={handleSubmit}>
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
                  required
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

            <button type="submit" className="signup-btn">
              Cadastrar
            </button>
          </form>

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
