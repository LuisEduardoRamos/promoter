import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hook/useForm";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import api from "../utils/api";

export const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const { email, password, onInputChange, onResetForm } = useForm({
    email: "luis@email.com",
    password: "123",
  });

  const onLogin = (e) => {
    e.preventDefault();
    api("POST", "login", { email, password })
      .then((response) => {
        if (response.token) {
          localStorage.setItem("token", response.token);
          navigate("/dashboard", {
            replace: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Credenciales incorrectas",
        });
      });
  };

  return (
    <div id="login">
      <Toast ref={toast} />
      <form onSubmit={onLogin}>
        <h1>Iniciar Sesión</h1>

        <div className="input-group">
          <FloatLabel>
            <label htmlFor="email">Email:</label>
            <InputText
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onInputChange}
              required
              autoComplete="off"
            />
          </FloatLabel>
        </div>
        <div className="input-group">
          <FloatLabel>
            <label htmlFor="password">Contraseña:</label>
            <InputText
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onInputChange}
              required
              autoComplete="off"
            />
          </FloatLabel>
        </div>

        <Button label="Iniciar Sesion" raised />

        <span>
          Aun no tienes cuenta?
          <a href="/register">Registrate</a>
        </span>
      </form>
    </div>
  );
};
