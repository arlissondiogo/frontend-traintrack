import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="left-side"></div>

      <div className="right-side">
        <h2 className="welcome">Bem Vindo (a)</h2>
        <h3 className="title">Últimos treinos adicionados</h3>

        <div className="cards-container">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="card">
              <div className="card-item">Exercício: Supino Reto</div>
              <div className="card-item">Séries e repetições: 3x8</div>
              <div className="card-item">
                Peso/carga utilizada: 20kg<br />
                Tempo de descanso: 30s
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
