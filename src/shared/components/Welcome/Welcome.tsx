import React from "react";
import "./welcome.css";

const Welcome: React.FC = () => {
  return (
    <div className="welcome-message">
      <div className="welcome-icon">🌍</div>
      <h2>Bienvenue !</h2>
      <p>
        Recherchez une ville ou utilisez votre position pour consulter les
        prévisions météo.
      </p>
    </div>
  );
};

export default Welcome;