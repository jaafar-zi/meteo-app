import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <p>
        Données fournies par{" "}
        <a
          href="https://api.meteo-concept.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Météo Concept
        </a>
      </p>
    </footer>
  );
};

export default Footer;