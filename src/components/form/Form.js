import "../../styles/form.css"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import CLOUD from '../home/CLOUD.png'

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
    <div>
       
       <div className="pb">
       <picture className='title-container'>
        <img src={CLOUD} alt='SCLOUD icon'/>
      </picture>
        <button id="boton1" className="button-add" onClick={handleModalAdd}>+</button>
      </div>
      
      

      
      <div className={`modal-add ${showModalAdd && 'show'}`}>
        <button className="button-close" onClick={handleModalAdd}>X</button>
        <h2>Upload file</h2>
        <form className="form">
          <h3>Select file</h3>
          <input onChange={e => readFileUploaded(e)} type="file" />
        </form>
        
      </div>



      <div className="file-container">
        <div className="button-container">
        <button id="boton2" onClick={handleModalAdd}>+</button>
        </div>
      
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