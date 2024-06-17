import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { FilesList } from "../components/FilesList";
import { updateProspect, getProspect, getProspects } from "../store/prospect";
import { useForm } from "../hook/useForm";
import api from "../utils/api";
export const ProspectForm = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();

  const [prospectCreated, setProspectCreated] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  const { prospect } = useSelector((state) => state.prospect);

  const {
    onInputChange,
    onResetForm,
    name,
    first_surname,
    second_surname,
    street,
    number,
    neighborhood,
    postal_code,
    city,
    phone,
    rfc,
  } = useForm({
    name: "",
    first_surname: "",
    second_surname: "",
    street: "",
    number: "",
    neighborhood: "",
    postal_code: "",
    city: "",
    phone: "",
    rfc: "",
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onSaveFile = async (event) => {
    event.preventDefault();

    if (!file || !prospect.id || !fileName) {
      toast.current.show({
        severity: "error",
        summary: "Advertencia",
        detail: "Ingrese todos los campos",
      });
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8000/api/file/${prospect.id}/${fileName}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Auth: token, // If authentication is required
          },
        }
      );

      if (response) {
        toast.current.show({
          severity: "success",
          summary: "Exito",
          detail: "Archivo guardado",
        });
        await dispatch(getProspect(prospect.id));
      } else {
        toast.current.show({
          severity: "error",
          summary: "Advertencia",
          detail: "Error al subir el archivo",
        });
      }
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Advertencia",
        detail: "Error al subir el archivo",
      });
    }
  };

  const onSaveProspect = async (e) => {
    e.preventDefault();
    const userId = parseInt(localStorage.getItem("userId"));
    api("POST", "prospect", {
      name,
      first_surname,
      second_surname,
      street,
      number,
      neighborhood,
      postal_code,
      city,
      phone,
      rfc,
      status: "Enviado",
      attended_by: userId,
    })
      .then((res) => {
        if (res.id) {
          dispatch(getProspects());
          dispatch(getProspect(res.id));
          setProspectCreated(true);
          toast.current.show({
            severity: "success",
            summary: "Exito",
            detail: "Prospecto guardado exitosamente",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "No se pudo guardar el prospecto",
            life: 3000,
          });
        }
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo guardar el prospecto",
          life: 3000,
        });
      });
  };

  return (
    <div className="prospect-form">
      <Toast ref={toast} />
      <div className="row">
        <div className="col">
          <label htmlFor="name">Nombre</label>
          <InputText
            type="name"
            name="name"
            id="name"
            value={name}
            onChange={onInputChange}
            required
            autoComplete="off"
          />
        </div>
        <div className="col">
          <label htmlFor="first_surname">Primer Apellido</label>
          <InputText
            id="first_surname"
            name="first_surname"
            value={first_surname}
            onChange={onInputChange}
            required
            autoComplete="off"
            type="text"
          />
        </div>
        <div className="col">
          <label htmlFor="second_surname">Segundo Apellido</label>
          <InputText
            id="second_surname"
            name="second_surname"
            value={second_surname}
            onChange={onInputChange}
            required
            autoComplete="off"
            type="text"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="street">Calle</label>
          <InputText
            id="street"
            name="street"
            value={street}
            onChange={onInputChange}
            required
            autoComplete="off"
            type="text"
          />
        </div>
        <div className="col">
          <label htmlFor="number">Numero</label>
          <InputText
            id="number"
            name="number"
            value={number}
            onChange={onInputChange}
            required
            autoComplete="off"
            type="number"
          />
        </div>
        <div className="col">
          <label htmlFor="neighborhood">Colonia</label>
          <InputText
            id="neighborhood"
            name="neighborhood"
            value={neighborhood}
            onChange={onInputChange}
            required
            autoComplete="off"
            type="text"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="postal_code">C.P.</label>
          <InputText
            id="postal_code"
            name="postal_code"
            value={postal_code}
            onChange={onInputChange}
            required
            autoComplete="off"
            type="number"
          />
        </div>
        <div className="col">
          <label htmlFor="city">Ciudad</label>
          <InputText
            id="city"
            name="city"
            value={city}
            onChange={onInputChange}
            required
            autoComplete="off"
            type="text"
          />
        </div>
        <div className="col">
          <label htmlFor="phone">Telefono</label>
          <InputText
            id="phone"
            name="phone"
            value={phone}
            onChange={onInputChange}
            required
            autoComplete="off"
            type="text"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="rfc">RFC</label>
          <InputText
            id="rfc"
            name="rfc"
            value={rfc}
            onChange={onInputChange}
            required
            autoComplete="off"
            type="text"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Button label="Guardar" onClick={onSaveProspect} />
        </div>
      </div>
      {prospectCreated && (
        <div className="row">
          <div className="col">
            <FilesList />
          </div>
        </div>
      )}
      {prospectCreated && (
        <div className="row">
          <div className="col">
            <label htmlFor="fileName">Nombre del archivo:</label>
            <InputText
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              required
              autoComplete="off"
              type="text"
            />
          </div>
          <div className="col col-button">
            <label htmlFor="file-upload" className="custom-file-upload">
              Seleccionar archivo
            </label>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              required
              placeholder="Seleccionar archivo"
            />
          </div>
          <div className="col col-button">
            <Button
              onClick={onSaveFile}
              severity="success"
              label="Subir Archivo"
            ></Button>
          </div>
        </div>
      )}
    </div>
  );
};
