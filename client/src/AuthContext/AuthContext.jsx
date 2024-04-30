import React, { createContext, useContext, useState } from 'react';


// C'est cette variable AuthContext qui va stocker tous les information de notre contexte
const AuthContext = createContext();

// AuthProvider est notre composant  fournisseur de contexte ,  Il enveloppe l'ensemble de l'application et fournit les informations d'authentification à tous ses enfants.
// Il utilise useState pour gérer l'état de l'utilisateur connecté.
// La méthode login est utilisée pour connecter l'utilisateur. Elle prend un token JWT en argument et le stocke dans le localStorage.
// La méthode logout est utilisée pour déconnecter l'utilisateur. Elle supprime le token JWT du localStorage.
// Finalement, il retourne le AuthContext.Provider avec une valeur qui contient l'état de l'utilisateur connecté, ainsi que les méthodes de connexion et de déconnexion

export const AuthProvider = ({ children }) => {

  const [connection , setConnection] = useState(null);
  const [role , setRole] = useState(null)

  const login = (token , badge) => {

    localStorage.setItem('biblioToken', token);
    localStorage.setItem('userRole' , badge)

  }

  const getConnection = () => {

    const token = localStorage.getItem('biblioToken')
    const userRole  = localStorage.getItem('userRole')

    if(token && userRole){

      setConnection(true)
      setRole(userRole)
    }

  }



  const logout = () => {

    localStorage.removeItem('biblioToken');
    localStorage.removeItem('userRole');
    setConnection(null);
    setRole(null);

  }

  return (

    <AuthContext.Provider value={{ connection, login , getConnection , logout , role }}>
      {children}
    </AuthContext.Provider>

  );
};

export const useAuth = () => useContext(AuthContext);