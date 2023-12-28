import './App.css';
import Home from './components/home/Home';
import { AppProvider } from './context/AppContext';


function App() {
  return (
    <>
    <AppProvider>
      <Home />
    </AppProvider>
    </>
  );
}

export default App;
