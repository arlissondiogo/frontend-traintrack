import React, { useState } from "react";
import "./TrainTrackLogin.css";

function TrainTrackLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      alert("Login attempt with: " + email);
      // Em uma aplicação real, você faria a autenticação com um servidor aqui
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Side */}
        <div className="left-side">
          <div className="logo">
            <img
              src="/logo.png"
              alt="Logo"
              className="logo-image"
              height={50}
            />
            <span>TrainTrack</span>
          </div>

          <div className="illustration-container">
            <img
              src="/traintrack-illustration.jpg"
              alt="Fitness illustration"
              className="illustration"
            />
          </div>

          <p className="description">
            Acompanhe seus treinos e evolua constantemente, controlando suas
            progressões de cargas com precisão
          </p>
        </div>

        {/* Right Side */}
        <div className="right-side">
          <h2>Entrar</h2>
          <p className="welcome">Bem Vindo</p>

          <form onSubmit={handleSubmit}>
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
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Entrar
            </button>
          </form>

          <p className="signup">
            Não tem uma conta? <a href="/cadastro">Registre-se agora</a>
          </p>
          <p className="forgot-password">
            Esqueceu sua senha? <a href="/recuperar-senha">Recuperar</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrainTrackLogin;
