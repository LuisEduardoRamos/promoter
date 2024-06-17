import React from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hook/useForm";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const { name, email, password, onInputChange, onResetForm } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const onRegister = (e) => {
    e.preventDefault();

    api("POST", "register", { email, password, name })
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
    onResetForm();
  };

  return (
    <div id="login">
      <form onSubmit={onRegister}>
        <h1>Registrarse</h1>
        <div className="input-group">
          <FloatLabel>
            <InputText
              type="name"
              name="name"
              id="name"
              value={name}
              onChange={onInputChange}
              required
              autoComplete="off"
            />
            <label htmlFor="name">Nombre</label>
          </FloatLabel>
        </div>
        <div className="input-group">
          <FloatLabel>
            <InputText
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onInputChange}
              required
              autoComplete="off"
            />
            <label htmlFor="email">Correo</label>
          </FloatLabel>
        </div>
        <div className="input-group">
          <FloatLabel>
            <InputText
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onInputChange}
              required
              autoComplete="off"
            />
            <label htmlFor="password">Contrase;a</label>
          </FloatLabel>
        </div>

        <Button label="Registrarse" raised />
      </form>
    </div>
  );
};
