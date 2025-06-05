import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleEnviarEmail = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.mensagem);
      } else {
        alert(data.erro);
      }
    } catch (error) {
      console.error("Erro ao enviar o e-mail:", error);
      alert("Erro ao enviar o e-mail de recuperação.");
    }
  };

  const handleVoltarLogin = () => navigate("/login");

  return (
    <div className="recovery-container">
      <div className="recovery-content">
        <div className="left-section">
          <div className="logo-container">
            <img src="/logo.png" alt="TrainTrack Logo" className="logo" />
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

          <form onSubmit={(e) => e.preventDefault()} className="recovery-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="form-input"
                required
              />
            </div>

            <button
              type="button"
              className="email-button"
              onClick={handleEnviarEmail}
            >
              Enviar e-mail
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
