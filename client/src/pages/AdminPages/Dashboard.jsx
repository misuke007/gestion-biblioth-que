import axios from "axios"
import { useAuth } from "../../AuthContext/AuthContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"




export default function Dashboard(){

    let {isAuthenticated , getConnection , logout , role } = useAuth()
    let [isLoading , setIsLoading] = useState(true)

    let navigate = useNavigate()

    useEffect(() => {

     getConnection()
     setIsLoading(false)

    })

   
  
    return (

        <div>
            

            {

                isLoading?(

                    <h1>Chargement</h1>

                ): isAuthenticated ? (

                    <h1>Togasoa eto @ admin</h1>
                ) : (

                    <h1>Veuillez vous reconnecter</h1>
                )


               
            }
           
           
        </div>
    )

}

