import Home from './Pages/Home';
import {Route,Routes } from 'react-router-dom';
import './App.css';
import RQuill from './Components/RQuill';
import {database} from './firebaseConfig'

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home database={database}/>} />
        <Route path={"/quill/:id"} element={<RQuill database={database}/>} />
      </Routes>
    </>
  );
}

export default App;
