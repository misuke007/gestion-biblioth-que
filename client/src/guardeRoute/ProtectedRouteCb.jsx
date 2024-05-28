import { Navigate } from "react-router-dom";

 const ProtectedRouteCb = ({children , connectionCb , role , redirectPath}) => {

    if(connectionCb && role === "membre"){

        return children

    }else{

        return <Navigate to = {redirectPath}/>
    }
 }

 export default ProtectedRouteCb