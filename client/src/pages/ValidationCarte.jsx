import { useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import axios from "axios";


export default function ValidationCarte(){

    let {getConnection , role} = useAuth()
    let [loading , setLoading] = useState(false)
    let [msgError , setMsgError] = useState("")
    

    const handleChange = (e) => {

    }

    const handleSubmit = (e) => {

        e.preventDefault()

    }



    return(

        <div>
            <div className="container-fluid p-0  min-vh-100 ">


<div className="row bg-white m-0">


    <div className=" left-box-register ps-0 col-md-3">

    </div>

    <div className=" right-box-register col-md-9 px-4 pt-3 px-5">

        <div className="header-text mb-5">
            <h2> Bibliothèque<span className="biblioTitre">Éclat</span></h2>
            <p>Veuillez nous fournir  les informations de votre carte pour valider votre inscription</p>
        </div>

        <form action="" className="row" onSubmit={handleSubmit}>


            <div className="input-group mb-3">
                <div class="alert alert-danger displayNone" role="alert w-100">
                   <div className="d-flex">
                        <div className="w-100">{msgError}</div>
                        <button type="button" class="btn-close ms-3" onClick={()=> document.querySelector('.alert-danger').classList.add('displayNone')}></button>
                   </div>
                </div>
            </div>


            <div className="col-md-12 mb-4">
                <label for="coordonneeCarte" className="form-label">Coordonnées de la carte</label>
                <input type="text" id="coordonneeCarte" name="numero" className="form-control form-control-md bg-light" onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-4">
                <input type="text"  name="date_expiration" className="form-control form-control-md bg-light" onChange={handleChange} required />
            </div>

            <div className="col-md-6 mb-4">
                
                <input type="text" name="cvv" className="form-control form-control-md bg-light" onChange={handleChange} required />
            </div>

            <div className="col-md-12 mb-4 d-flex justify-content-center align-items-center">

                { loading ? (

                <button className="btn btn-auth-load w-50 fs-6" type="button" disabled>
                <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                <span role="status"> Vérification en cours...</span>
                </button>

            ) : (

                <button type = "submit" className="btn btn-auth w-50 fs-6">Vérifier</button>
            )}
               
            </div>



        </form>

    </div>

</div>

</div>
        </div>
    )
}