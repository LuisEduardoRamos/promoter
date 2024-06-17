import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { filterProspects } from "../store/prospect";
import { useDispatch } from "react-redux";
import { Dialog } from "primereact/dialog";
import { getProspects } from "../store/prospect";
import { ProspectForm } from "./ProspectForm";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [formVisible, setFormVisible] = useState(false);
  const handleChange = (e) => {
    dispatch(filterProspects(e.target.value));
  };
  return (
    <div id="SearchBar">
      <InputText
        placeholder="Buscar..."
        onChange={(e) => handleChange(e)}
      ></InputText>
      <Button
        severity="success"
        label="Agregar"
        onClick={() => setFormVisible(true)}
      ></Button>
      <Dialog
        header="Agregar prospecto"
        visible={formVisible}
        style={{ width: "70vw" }}
        onHide={() => {
          if (!formVisible) return;
          setFormVisible(false);
          dispatch(getProspects());
        }}
      >
        <ProspectForm />
      </Dialog>
    </div>
  );
};
