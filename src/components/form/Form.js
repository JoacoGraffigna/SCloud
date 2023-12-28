import "../../App.css";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Form = () => {

  const { filesList, setFilesList } = useContext(AppContext);

    const [menuVisible, setMenuVisible] = useState(false);
    const [menuVisible2, setMenuVisible2] = useState(false);

    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };

    const toggleMenu2 = () => {
      setMenuVisible2(!menuVisible2);
    };


    const readFile = (e) => {
      const file = e.target.files[0];
      if (file) {
        const read = new FileReader();
        read.onload = (e) => {
          const newFile = {
            name: file.name,
            content: e.target.result,
            id: crypto.randomUUID(),
          };
          let f = filesList;
          f.push(newFile)
          setFilesList(f);
        };
        read.readAsText(file);
      }
    }


  return (
    <div className="container">
      <div className="boton">
        <button className="boton1" type="button" onClick={toggleMenu}>+ Add</button>
      </div>

      {/* <div className="boton">
        <button className="boton2" type="button" onClick={toggleMenu2}><GoFileSymlinkFile /> Files</button>
      </div> */}

      <div className={`menu ${menuVisible && 'show'}`}>
      <button className="close-btn" onClick={toggleMenu}>X</button>
        <h2>Upload file</h2>
        <form className="form">
          <h3>Select file</h3>
          <input onChange={e => readFile(e)} type="file" id="file1" />
        </form>
        <button  className="boton2" type="button" onClick={toggleMenu}>Save</button>
      </div>

      <div className={`menu2 ${menuVisible2 && 'show'}`}>
        <button className="close-btn" onClick={toggleMenu2}>X</button>
        <h2>Your files</h2>
      </div>


      <div className="file-container">
      {filesList.map(file => (
          <div key={file.id} className="file">
            <p className="file-title">Name {file.name}</p>
            <p className="file-content">Content: {file.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
