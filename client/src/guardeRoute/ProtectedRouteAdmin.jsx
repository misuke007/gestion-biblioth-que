
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Connexion from '../pages/Connexion';

const ProtectedRouteAdmin = ({ children ,  connection, role ,  redirectPath }) => {
     

  if (connection  && role === "ADMIN" ) {

    return children
  }

  return <Navigate to={redirectPath} />


}
export default ProtectedRouteAdmin;