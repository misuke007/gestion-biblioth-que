import axios from "axios"
import { useState } from "react"
import { useAuth } from "../AuthContext/AuthContext"
import { useEffect } from "react"


export default function Accueil(){

    let {connection , getConnection , logout , role} = useAuth()


    useEffect(() => {
        
        getConnection()
        
    })

    console.log(connection,role)
      
    
    return (

        <div>
            {
                connection ? (

                    <h2>Tongasoa eto @ Accueil</h2>
                ):(

                    <h2>Tsisy connecté</h2>
                )
            }
            
          
        </div>
    )

}

