import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthProvider} from "./AuthContext/AuthContext"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles/style.css"
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import Accueil from "./pages/Accueil"
import Dashboard from "./pages/AdminPages/Dashboard"
import AffichageParCat from "./components/AffichageParCat";
import ListeLivre from "./components/ListeLivre";
import PageTEst from "./pages/AdminPages/Test"
import ProtectedRouteAdmin from "./guardeRoute/ProtectedRouteAdmin";
import Page_Error from "./pages/Page_Error";
import FormCb from "./pages/FormCb";






function App() {



// let [connection , role , ] = [localStorage.getItem('biblioToken') , localStorage.getItem('userRole') , localStorage.getItem('')]

  return (

    <BrowserRouter>

      <AuthProvider>

        <Routes>

          <Route path="/" element= {<Accueil />}>
          <Route path='' element={<ListeLivre/>} />
          <Route path='categorie' element={<AffichageParCat/>} />
          </Route>
          <Route path = "/validation_carte_bancaire" element = {<FormCb/>}></Route>
          <Route path="/unauthorized" element= {<Page_Error />}></Route>
          <Route path="/connexion" element= {<Connexion />}></Route>
          <Route path="/inscription" element= {<Inscription />}></Route> 
          {/* <Route path="/dashboard" element={<ProtectedRouteAdmin connection = {connection} role = {role} redirectPath = "/unauthorized"><Dashboard/></ProtectedRouteAdmin>}/> */}
          <Route path="/dashboard" element={<Dashboard/>}/>

        

          
        </Routes>

      </AuthProvider>

    </BrowserRouter>
    
  );
}

export default App;
