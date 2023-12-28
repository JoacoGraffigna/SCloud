import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  
  const [filesList, setFilesList] = useState([]);


  const data = {
    filesList,
    setFilesList,
  }

  return <AppContext.Provider value={data} >{ children }</AppContext.Provider>
}

export { AppContext }
export { AppProvider }