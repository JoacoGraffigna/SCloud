import "../../styles/form.css"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

function Form() {

  const { filesList, setFilesList } = useContext(AppContext);

  const [showModalAdd, setShowModalAdd] = useState(false);
  // const [menuVisible2, setMenuVisible2] = useState(false);

  
  const handleModalAdd = () => {
    setShowModalAdd(!showModalAdd);
  };

  
  useEffect(() => {
    setFilesList(getFilesLoaded())
  }, [])

  const localStorageKey = "filesLoaded"

  const getFilesLoaded = () => {
    return JSON.parse(localStorage.getItem(localStorageKey)) || []
  }

  const addNewFile = (newFile) => {
    localStorage.setItem(localStorageKey, JSON.stringify([...filesList, newFile]))
    setFilesList([...filesList, newFile]);
  }
  const deleteFile = (id) => {
    const files = filesList.filter(file => file.id != id)
    localStorage.setItem(localStorageKey, JSON.stringify(files))
    setFilesList(files)
  }




  // const toggleMenu2 = () => {
  //   setMenuVisible2(!menuVisible2);
  // };


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
        // let files = filesList;
        // files.push(newFile)
        // setFilesList(files);
        addNewFile(newFile)

      };
      read.readAsText(fileUploaded);
      setShowModalAdd(false)
    }
  }


  return (
    <div className="container">

      <div className="button-container">
        <button className="button-add" onClick={handleModalAdd}>+ Add</button>
      </div>

      {/* <div className="boton">
        <button className="boton2" type="button" onClick={toggleMenu2}><GoFileSymlinkFile /> Files</button>
      </div> */}

      <div className={`modal-add ${showModalAdd && 'show'}`}>
        <button className="button-close" onClick={handleModalAdd}>X</button>
        <h2>Upload file</h2>
        <form className="form">
          <h3>Select file</h3>
          <input onChange={e => readFileUploaded(e)} type="file" />
        </form>
        {/* <button  className="button-save" onClick={handleModalAdd}>Save</button> */}
      </div>

      {/* <div className={`menu2 ${menuVisible2 && 'show'}`}>
        <button className="close-btn" onClick={toggleMenu2}>X</button>
        <h2>Your files</h2>
      </div> */}


      <div className="file-container">
      {filesList.map(file => (
          <div key={file.id} className="file-item">
            <div className="file-item-text">
              <p className="file-item-text-title">{file.name}</p>
              <p className="file-item-text-content">{file.content}</p>
            </div>
            <div className="file-item-tash" onClick={() => deleteFile(file.id)} >
              <span>X</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export { Form }