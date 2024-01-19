import "../../styles/form.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import CLOUD from "../home/CLOUD.png";
import { FaDownload } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Paged from "../pagination/Paged";
import{uploadFile} from '../../firebase/config'

function Form() {
  const { filesList, setFilesList, showList } = useContext(AppContext);

  const [showModalAdd, setShowModalAdd] = useState(false);
  // const [file, setFile] = useState(null);
  const [imageURLs, setImageURLs] = useState([]);
  const [loadingModal, setLoadingModal] = useState(false);


  const handleModalAdd = () => {
    setShowModalAdd(!showModalAdd);
  };


  const downloadImage = (url, imageName) => {
  
      alert("the image will be downloaded")
  };

  // GETING DATA FILES

  useEffect(() => {
    setFilesList(getFilesLoaded());
    setImageURLs(getImagesLoaded());
  }, []);

  const localStorageKeyFiles = "filesLoaded";
  const localStorageKeyImages = "imagesLoaded";

  const getFilesLoaded = () => {
    return JSON.parse(localStorage.getItem(localStorageKeyFiles)) || [];
  };
  const getImagesLoaded = () => {
    return JSON.parse(localStorage.getItem(localStorageKeyImages)) || [];
  }

  
  // FUNCTIONS HANDLE FILES

  const addNewFile = (newFile) => {
    localStorage.setItem(
      localStorageKeyFiles,
      JSON.stringify([...filesList, newFile])
    );
    setFilesList([...filesList, newFile]);
  };
  const deleteFile = (id) => {
    const files = filesList.filter((file) => file.id !== id);
    localStorage.setItem(localStorageKeyFiles, JSON.stringify(files));
    setFilesList(files);
  };

  const downloadFile = (id) => {
    // create file
    const file = filesList.find((file) => file.id === id);
    const blob = new Blob([file.content], { type: "octet/steam" });
    const url = window.URL.createObjectURL(blob);
    // create element to download file
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

  // FUNCTIONS HANDLE IMAGES

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      setLoadingModal(true);
      const result = await uploadFile(e);
      // setImageURLs((prevURLs) => [...prevURLs, { url: result, id: generateId() }]);
      // console.log(result);
      const newImage = {
        url: result,
        id: crypto.randomUUID(),
      }
      localStorage.setItem(localStorageKeyImages, JSON.stringify([...imageURLs, newImage]));
      setImageURLs([...imageURLs, newImage])
      setShowModalAdd(false);
      setLoadingModal(false);
    } catch (err) {
      console.log(err);
      alert('Failed to upload');
    }
  };
  const handleDelete = (id) => {
    const images = imageURLs.filter(image => image.id !== id);
    localStorage.setItem(localStorageKeyImages, JSON.stringify(images));
    setImageURLs(images);
  };

  // const generateId = () => {
  //   return Math.random().toString(36).substr(2, 9);
  // };


  return (
    <div>
      <div className="pb">
        <picture className="title-container">
          <img src={CLOUD} alt="SCLOUD icon" />
        </picture>
        <button id="boton1" className="button-add" onClick={handleModalAdd}>+</button>
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
        <form onSubmit={handleSubmit}>
        <input className="input-file2" type="file" onChange={(e) => handleSubmit(e.target.files[0])} />
        {/* <button type="submit">Upload</button> */}
      </form>
      {loadingModal && <p>LOADING...</p>}
      </div>

      <div className="file-container">
        <div className="container-up-box">
          <div className="container-paged">
            <Paged data={filesList} />
          </div>

          <div className="button-container">
            <button id="boton2" onClick={handleModalAdd}>+</button>
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

<div className="image-grid">
  {imageURLs.map((image) => (
    <div key={image.id} className="image-item">
      <div className="image-wrapper">
        <img src={image.url} alt={`Preview ${image.id}`} />
        
      </div>
      <div className="file-item-icons2">
          <span className="tash2" onClick={() => handleDelete(image.id)}>
            <IoIosCloseCircleOutline />
          </span>
          <span className="download2" onClick={() => downloadImage(image.url, `image_${image.id}`)}>
            <FaDownload />
          </span>
        </div>
    </div>
  ))}
</div>

      </div>

    </div>
  );
}

export { Form };
