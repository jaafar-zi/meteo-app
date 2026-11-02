import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { loginUser } from "../authSlice";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginUser({ email, password }));
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <div className="auth-error-banner">{error}</div>}

      <div className="auth-field">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          required
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="auth-field">
        <label htmlFor="login-password">Mot de passe</label>
        <input
          id="login-password"
          type="password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="auth-submit-btn" disabled={loading}>
        {loading ? "Connexion en cours..." : "Se connecter"}
      </button>
    </form>
  );
};

export default LoginForm;