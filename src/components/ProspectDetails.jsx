import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { FilesList } from "../components/FilesList";
import { updateProspect, getProspect } from "../store/prospect";
import axios from "axios";

export const ProspectDetails = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const { prospect } = useSelector((state) => state.prospect);
  const [observations, setObservations] = useState("");
  const [prospectState, setProspectState] = useState(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const items = ["Enviado", "Autorizado", "Rechazado"];

  const onUpdateProspect = () => {
    dispatch(
      updateProspect({
        id: prospect.id,
        data: { observations, status: prospectState },
      })
    );
  };
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

  useEffect(() => {
    if (prospect?.observations) {
      setObservations(prospect.observations);
    } else {
      setObservations("");
    }

    if (prospect?.status) {
      setProspectState(prospect.status);
    }
  }, []);

  return (
    <div className="prospect-details">
      <Toast ref={toast} />
      <div className="row">
        <div className="col">
          <label htmlFor="name">Nombre:</label>
          <InputText
            id="name"
            value={prospect?.name}
            disabled
            className="input-text"
          />
        </div>
        <div className="col">
          <label htmlFor="surname">Apellidos:</label>
          <InputText
            id="surname"
            value={`${prospect.first_surname} ${prospect.second_surname}`}
            disabled
            className="input-text"
          />
        </div>
        <div className="col">
          <label htmlFor="rfc">RFC:</label>
          <InputText
            id="rfc"
            value={prospect.rfc}
            disabled
            className="input-text"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="street">Calle:</label>
          <InputText
            id="street"
            value={prospect?.street}
            disabled
            className="input-text"
          />
        </div>
        <div className="col">
          <label htmlFor="number">Numero:</label>
          <InputText
            id="number"
            value={prospect.number}
            disabled
            className="input-text"
          />
        </div>
        <div className="col">
          <label htmlFor="neighborhood">Colonia:</label>
          <InputText
            id="neighborhood"
            value={prospect.neighborhood}
            disabled
            className="input-text"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="postal_code">Codigo Postal:</label>
          <InputText
            id="postal_code"
            value={prospect?.postal_code}
            disabled
            className="input-text"
          />
        </div>
        <div className="col">
          <label htmlFor="city">Ciudad:</label>
          <InputText
            id="city"
            value={prospect.city}
            disabled
            className="input-text"
          />
        </div>
        <div className="col">
          <label htmlFor="phone">Telefono:</label>
          <InputText
            id="phone"
            value={prospect.phone}
            disabled
            className="input-text"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="status">Estatus:</label>
          <SelectButton
            value={prospectState}
            onChange={(e) => setProspectState(e.value)}
            options={items}
          />
        </div>
        <div className="col">
          <label htmlFor="observations">Observaciones:</label>
          <InputText
            id="observations"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            className="input-text"
          />
        </div>
      </div>
      <div className="col col-button">
        <Button onClick={onUpdateProspect} severity="success" label="Guardar"></Button>
      </div>
      <div className="row">
        <div className="col">
          <FilesList />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="fileName">Nombre del archivo:</label>
          <InputText
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="input-text"
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
          <Button onClick={onSaveFile} severity="success" label="Subir Archivo"></Button>
        </div>
      </div>
    </div>
  );
};
