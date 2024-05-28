
import { Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({ children ,  connection, role ,  redirectPath }) => {
     

  if (connection && role === "ADMIN" ) {

    return children
  }

  return <Navigate to={redirectPath} />


}
export default ProtectedRouteAdmin;