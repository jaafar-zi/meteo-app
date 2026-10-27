import React from "react";

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <h1>🌤️ Météo France</h1>
      <p className="subtitle">Prévisions météo jusqu'à 14 jours</p>
    </header>
  );
};

export default Header;