import React from "react";
import { UserMenu } from "../features/auth";

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-top-bar">
        <div className="logo-title">
          <h1>🌤️ Météo France</h1>
        </div>
        <UserMenu />
      </div>
      <p className="subtitle">Prévisions météo jusqu'à 14 jours</p>
    </header>
  );
};

export default Header;