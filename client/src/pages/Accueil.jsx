import axios from "axios"
import { useState } from "react"
import { useAuth } from "../AuthContext/AuthContext"
import { useEffect } from "react"
import { useNavigate , Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Recherche from "../components/Recherche"
import NouveauT from "../components/NouveauT"
import ListeLivre from "../components/ListeLivre"



export default function Accueil(){

    let {isAuthenticated , getConnection , roleAccess ,  logout , role } = useAuth()
    let navigate = useNavigate()
    
    
    useEffect(() => {

        getConnection()
    })
 
    // localStorage.removeItem('biblioToken');
    // localStorage.removeItem('userRole');
   
    return (

        <div>
           

           <Navbar/>
           {/* ato amn recherche no mampisy ilay defilement horizontale */}
           <Recherche/>
           <NouveauT/>
           <Outlet/>
            
          
        </div>
    )

}

