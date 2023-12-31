import "../../styles/form.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import CLOUD from "../home/CLOUD.png";
import { FaDownload } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Paged from "../pagination/Paged";

function Form() {
  const { filesList, setFilesList, showList } = useContext(AppContext);

  const [showModalAdd, setShowModalAdd] = useState(false);

  useEffect(() => {
    setFilesList(getFilesLoaded());
  }, []);

  const handleModalAdd = () => {
    setShowModalAdd(!showModalAdd);
  };

  const localStorageKey = "filesLoaded";

  const getFilesLoaded = () => {
    return JSON.parse(localStorage.getItem(localStorageKey)) || [];
  };

  const addNewFile = (newFile) => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify([...filesList, newFile])
    );
    setFilesList([...filesList, newFile]);
  };
  const deleteFile = (id) => {
    const files = filesList.filter((file) => file.id !== id);
    localStorage.setItem(localStorageKey, JSON.stringify(files));
    setFilesList(files);
  };

  const downloadFile = (id) => {
    // crea el archivo
    const file = filesList.find((file) => file.id === id);
    const blob = new Blob([file.content], { type: "octet/steam" });
    const url = window.URL.createObjectURL(blob);
    // crea el elemento enlace
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const readFileUploaded = (e) => {
    const fileUploaded = e.target.files[0];
    if (fileUploaded) {
      const read = new FileReader();
      read.onload = (e) => {
        const newFile = {
          name: fileUploaded.name,
          content: e.target.result,
          id: crypto.randomUUID(),
        };
        addNewFile(newFile);
      };
      read.readAsText(fileUploaded);
      setShowModalAdd(false);
    }
  };

  return (
    <div>
      <div className="pb">
        <picture className="title-container">
          <img src={CLOUD} alt="SCLOUD icon" />
        </picture>
        <button id="boton1" className="button-add" onClick={handleModalAdd}>
          +
        </button>
      </div>

      <div className={`modal-add ${showModalAdd && "show"}`}>
        <button className="button-close" onClick={handleModalAdd}>
          <IoIosCloseCircleOutline />
        </button>
        <h2>Upload file</h2>
        <form className="form">
          <input
            onChange={(e) => readFileUploaded(e)}
            type="file"
            className="input-file"
          />
        </form>
      </div>

      <div className="file-container">
        <div className="container-up-box">
          <div className="container-paged">
            <Paged data={filesList} />
          </div>

          <div className="button-container">
            <button id="boton2" onClick={handleModalAdd}>
              +
            </button>
          </div>
        </div>

        {showList &&
          showList?.map((file) => (
            <div key={file.id} className="file-item">
              <div className="file-item-text">
                <p className="file-item-text-title">{file.name}</p>
                <p className="file-item-text-content">{file.content}</p>
              </div>
              <div className="file-item-icons">
                <span className="tash" onClick={() => deleteFile(file.id)}>
                  <IoIosCloseCircleOutline />
                </span>
                <span
                  className="download"
                  onClick={() => downloadFile(file.id)}
                >
                  <FaDownload />
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export { Form };
