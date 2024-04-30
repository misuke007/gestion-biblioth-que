import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles/style.css"
import { useAuth } from "./AuthContext/AuthContext";


import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Accueil from "./pages/Accueil"
import Dashboard from "./pages/AdminPages/Dashboard"
import PageTEst from "./pages/AdminPages/Test"
import ProtectedRouteAdmin from "./guardeRoute/ProtectedRouteAdmin";
import Page_Error from "./pages/Page_Error";
import {AuthProvider} from "./AuthContext/AuthContext"




function App() {

let connection = localStorage.getItem('biblioToken')
let role = localStorage.getItem('userRole')

  return (

    <BrowserRouter>

      <AuthProvider>

        <Routes>

          <Route path="/" element= {<Accueil />}></Route>
          <Route path="/unauthorized" element= {<Page_Error />}></Route>
          <Route path="/connexion" element= {<Connexion />}></Route>
          <Route path="/inscription" element= {<Inscription />}></Route> 
          <Route path="/dashboard" element={<ProtectedRouteAdmin connection = {connection} role = {role} redirectPath = "/unauthorized"><Dashboard/></ProtectedRouteAdmin>}/>
        
        </Routes>

      </AuthProvider>

    </BrowserRouter>
    
  );
}

export default App;
