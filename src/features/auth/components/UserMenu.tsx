import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { openAuthModal, logoutUser } from "../authSlice";

const UserMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="auth-nav-buttons">
        <button
          className="btn-login"
          onClick={() => dispatch(openAuthModal("login"))}
        >
          Connexion
        </button>
        <button
          className="btn-register"
          onClick={() => dispatch(openAuthModal("register"))}
        >
          Inscription
        </button>
      </div>
    );
  }

  return (
    <div className="user-menu-container">
      <button
        className="user-menu-button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className="user-avatar">👤</span>
        <span className="user-name">{user.name}</span>
        <span className="dropdown-arrow">▼</span>
      </button>

      {dropdownOpen && (
        <div className="user-menu-dropdown">
          <div className="user-info-header">
            <strong>{user.name}</strong>
            <small>{user.email}</small>
          </div>
          <div className="menu-divider" />
          <button
            className="menu-logout-btn"
            onClick={() => {
              setDropdownOpen(false);
              dispatch(logoutUser());
            }}
          >
            🚪 Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;