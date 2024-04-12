import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Csv_json from './screens/Csv_json';
import DashBoard from './screens/DashBoard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path={"/"} element = {<Csv_json />} />
      <Route path={"/dashboard"} element = {<DashBoard />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
