import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, novaSenha: newPassword }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Senha redefinida com sucesso!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.erro || "Erro ao redefinir senha.");
      }
    } catch {
      setMessage("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="recovery-container">
      <div className="recovery-content">
        <div className="left-section">
          <h2 className="recovery-title">Redefinir senha</h2>
          <form onSubmit={handleSubmit} className="recovery-form">
            <div className="form-group">
              <label htmlFor="novaSenha">Nova Senha:</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-input"
              />
            </div>
            <button type="submit" className="submit-button">
              Redefinir
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
