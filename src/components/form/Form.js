import "../../App.css";
import React, { useState } from "react";
import { GoFileSymlinkFile } from "react-icons/go";

const Form = () => {

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };

    const [menuVisible2, setMenuVisible2] = useState(false);

    const toggleMenu2 = () => {
      setMenuVisible2(!menuVisible2);
    };


  return (
    <div>
      <div className="boton">
        <button className="boton1" type="button" onClick={toggleMenu}>+ Add</button>
      </div>

      <div className="boton">
        <button className="boton2" type="button" onClick={toggleMenu2}><GoFileSymlinkFile /> Files</button>
      </div>

      <div className={`menu2 ${menuVisible2 ? 'show' : ''}`}>
      <button className="close-btn" onClick={toggleMenu2}>X</button>
        <h1>
        Here will be the uploaded files
        </h1>
      </div>
      <div className={`menu ${menuVisible ? 'show' : ''}`}>
      <button className="close-btn" onClick={toggleMenu}>X</button>
        <h1>Upload file</h1>
        <form className="form">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Description
              
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="button" class="btn-primary" onClick={toggleMenu}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
