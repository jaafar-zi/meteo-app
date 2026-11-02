import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeAuthModal, setActiveTab } from "../authSlice";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, activeTab } = useAppSelector((state) => state.auth);

  if (!isModalOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={() => dispatch(closeAuthModal())}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="auth-modal-close"
          onClick={() => dispatch(closeAuthModal())}
        >
          ✕
        </button>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => dispatch(setActiveTab("login"))}
          >
            Se connecter
          </button>
          <button
            className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => dispatch(setActiveTab("register"))}
          >
            S'inscrire
          </button>
        </div>

        {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthModal;