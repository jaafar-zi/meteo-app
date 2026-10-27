import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { requestGeolocation } from "./geolocationSlice";
import "./geolocation.css";

const GeolocationButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.geolocation);

  const handleClick = () => {
    dispatch(requestGeolocation());
  };

  return (
    <button
      className="geo-button"
      onClick={handleClick}
      disabled={loading}
      title="Utiliser ma position"
    >
      {loading ? "⏳ Localisation..." : "📍 Ma position"}
    </button>
  );
};

export default GeolocationButton;