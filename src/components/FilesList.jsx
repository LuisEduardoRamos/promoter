import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../utils/api";

export const FilesList = () => {
  const { prospect } = useSelector((state) => state.prospect);

  const getFile = async (path, name) => {
    const response = await api(
      "GET",
      `file/${path}`,
      {},
      { responseType: "blob" }
    );
    const blob = new Blob([response]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${name}.${path.slice(path.lastIndexOf(".") + 1)}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  const renderFiles = () => {
    if (prospect?.files) {
      return (
        <ul className="files-list">
          {prospect?.files.map((file, index) => (
            <li key={index} onClick={() => getFile(file.path, file.name)}>
              <div className="file-icon">
                <i className="pi pi-file"></i>
              </div>
              <span>{file.name}</span>
            </li>
          ))}
        </ul>
      );
    }
  };
  return (
    <div className="files-list-wrapper">
      {prospect?.files?.length !== 0 && <label>Archivos</label>}
      {renderFiles()}
    </div>
  );
};
