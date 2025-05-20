import React from "react";
import "./DeleteAccountModal.css";

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p className="modal-message">
          Você tem certeza que quer deletar sua conta permanentemente?
        </p>
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>
            Não
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            Deletar conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
