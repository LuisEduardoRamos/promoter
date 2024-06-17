import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProspects, getProspect } from "../store/prospect";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { ProspectForm } from "../components/ProspectForm";
import { ProspectDetails } from "../components/ProspectDetails";
import { SearchBar } from "../components/SearchBar";

export const DashboardPage = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);

  const [detailsVisible, setDetailsVisible] = useState(false);

  const { prospects, status, prospect, prospectStatus, filterTerm } = useSelector(
    (state) => state.prospect
  );

  const onRowSelect = ({ data }) => {
    dispatch(getProspect(data.id));
    setDetailsVisible(true);
  };

  useEffect(() => {
    dispatch(getProspects());
  }, [dispatch]);

  return (
    <div id="prospects" className="card">
      {status === "loading" && (
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="8"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
      )}
      {status === "succeeded" && (
        <div className="wrapper">
          <Toast ref={toast} />
          <SearchBar />
          <DataTable
            value={prospects}
            showGridlines
            stripedRows
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 20, 50]}
            onRowSelect={onRowSelect}
            selectionMode="single"
            selection={prospect}
            globalFilter={filterTerm}
          >
            <Column field="id" sortable header="ID"></Column>
            <Column field="name" sortable header="Name"></Column>
            <Column field="first_surname" sortable header="Apellido"></Column>
            <Column
              field="status"
              header="Estatus"
              sortable
              body={statusBodyTemplate}
            ></Column>
            <Column field="rfc" sortable header="RFC"></Column>
            <Column field="phone" sortable header="Telefono"></Column>
          </DataTable>
          <Dialog
            header="Detalles del prospecto"
            visible={detailsVisible}
            style={{ width: "50vw" }}
            onHide={() => {
              if (!detailsVisible) return;
              setDetailsVisible(false);
              dispatch(getProspects());
            }}
          >
            {prospectStatus === "succeeded" && <ProspectDetails />}
          </Dialog>
        </div>
      )}
    </div>
  );
};

const statusBodyTemplate = (item) => {
  return <Tag value={item.status} severity={getStatus(item)}></Tag>;
};

const getStatus = (item) => {
  switch (item.status) {
    case "Autorizado":
      return "success";

    case "Enviado":
      return "warning";

    case "Rechazado":
      return "danger";

    default:
      return null;
  }
};
