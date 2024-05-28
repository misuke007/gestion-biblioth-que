import React, { createContext, useContext, useState  , useEffect} from 'react';
import { jwtDecode } from "jwt-decode"
// C'est cette variable AuthContext qui va stocker tous les information de notre contexte
const AuthContext = createContext();

// AuthProvider est notre composant  fournisseur de contexte ,  Il enveloppe l'ensemble de l'application et fournit les informations d'authentification à tous ses enfants.
// Il utilise useState pour gérer l'état de l'utilisateur connecté.
// La méthode login est utilisée pour connecter l'utilisateur. Elle prend un token JWT en argument et le stocke dans le localStorage.
// La méthode logout est utilisée pour déconnecter l'utilisateur. Elle supprime le token JWT du localStorage.
// Finalement, il retourne le AuthContext.Provider avec une valeur qui contient l'état de l'utilisateur connecté, ainsi que les méthodes de connexion et de déconnexion

export const AuthProvider = ({ children }) => {

  const [isAuthenticated , setIsAuthenticated] = useState(false);
  const [role ,  setRole] = useState(null)
  const [cbConnection , setCbConnection] = useState(false);


 

  const login = (token , badge) => {

    localStorage.setItem('biblioToken', token);
    localStorage.setItem('userRole' , badge)

  }
  

  const getConnection = () => {

    const token = localStorage.getItem('biblioToken')
    const userRole  = localStorage.getItem('userRole')


    if(token){

      const decodedToken = jwtDecode(token)
      const currentTime = Math.floor(Date.now() / 1000)

      if(decodedToken.exp < currentTime){

        localStorage.removeItem('biblioToken')
        localStorage.removeItem('userRole')
        setIsAuthenticated(false)
        setRole(null)

    }else{

      setIsAuthenticated(true)
      setRole(userRole)
    }

    }

  }


  const setConnectionCb = (token , badge) => {

    localStorage.setItem('CbToken', token);
    localStorage.setItem('userRole' , badge)

  }



  const getTokenPayment = () => {

    const tokenPayement = localStorage.getItem('CbToken')
    const userRole  = localStorage.getItem('userRole')

    if(tokenPayement){

      const decodedToken = jwtDecode(tokenPayement)
      const currentTime = Math.floor(Date.now() / 1000)

      if(decodedToken.exp < currentTime){

        localStorage.removeItem('CbToken')
        localStorage.removeItem('userRole')
        setCbConnection(false)
        setRole(null)

    }else{

      setCbConnection(tokenPayement)
      setRole(userRole)
    }

    }

  }



  const logout = () => {

    localStorage.removeItem('biblioToken');
    localStorage.removeItem('userRole');
    setIsAuthenticated(null);
    setRole(null);

  }

  return (

    <AuthContext.Provider value={{ isAuthenticated,cbConnection , login , getConnection , logout   ,getTokenPayment , role , setConnectionCb }}>
      {children}
    </AuthContext.Provider>

  );
};

export const useAuth = () => useContext(AuthContext);