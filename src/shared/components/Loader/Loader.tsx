import React from "react";
import "./loader.css";

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({
  message = "Chargement des prévisions...",
}) => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-cloud">☁️</div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Loader;