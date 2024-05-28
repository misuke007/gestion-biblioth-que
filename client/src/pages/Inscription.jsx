
import { useAuth } from "../AuthContext/AuthContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import VerifCaractereMdp from "../utils/VerifCaractereMdp"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';


let userData = {

    nom : "",
    prenom : "",
    email : "",
    adresse : "",
    mot_de_passe : "",
    confirm_mot_de_passe : ""

}


export default function Inscription() {

    let { getConnection, connection, role , setConnectionCb } = useAuth()
    let [profil, setProfil] = useState(null)
    let [files , setFiles] = useState()
    let [data , setData] = useState(userData)
    let [loading , setLoading] = useState(false)
    let [msgError , setMsgError] = useState("")

    const alert = document.querySelector('.alert-danger')
    let navigate = useNavigate()
   


    const recupProfil = (e) => {

        const file = e.target.files[0]
        setFiles(file)
        const reader = new FileReader()

        reader.onloadend = () => { setProfil(reader.result) }

        if (file) reader.readAsDataURL(file);
    }


    const handleChange = (e) => {

        setData({

            ...data,
            [e.target.name] : e.target.value
        })

    }

    const handleSubmit = (e) => {

        e.preventDefault()

       
        if(!files){

            alert.classList.remove('displayNone')
            setMsgError('Veuillez insérer une photo de vous')

        }else if(!VerifCaractereMdp(data.mot_de_passe)){

            alert.classList.remove('displayNone')
            setMsgError('Votre mot de passe doit contenir au moins 6 caractères, y compris des lettres ou des des caractères spéciaux ')

        }else if(data.mot_de_passe !== data.confirm_mot_de_passe){

            alert.classList.remove('displayNone')
            setMsgError('Vérifiez la confirmation de votre mot de passe!')

        }else{

            setLoading(true)

            let formData = new FormData()

            formData.append('nom' ,data.nom )
            formData.append('prenom' ,data.prenom )
            formData.append('email' ,data.email )
            formData.append('adresse' ,data.adresse )
            formData.append('mot_de_passe' ,data.mot_de_passe )
            formData.append('photo' , files )

            axios.post('http://localhost:9000/auth/inscription' , formData)



            .then((res) => {

                const data = res.data


                if(!data.server_msg){
                    
                 setConnectionCb(data.token , data.badge)
                 navigate('/validation_carte_bancaire')

                }else{
                   
                    alert.classList.remove('displayNone')
                    setMsgError(data.server_msg)
                }
            })

            .catch((error) => {

                console.log(error)
            })

            .finally(() =>{setLoading(false)})

        
        }
      
    }

    return (
        
        <div>

            <div className="container-fluid p-0  min-vh-100 ">


                <div className="row bg-white m-0">


                    <div className=" left-box-register ps-0 col-md-3">

                    </div>

                    <div className=" right-box-register col-md-9 px-4 pt-3 px-5">

                        <div className="header-text mb-5">
                            <h2> Créer un compte Bibliothèque<span className="biblioTitre">Éclat</span></h2>
                            <p>Veuillez remplir tous les champs</p>
                        </div>

                        <form action="" className="row" onSubmit={handleSubmit}>

                            <div className="input-group mb-5">

                                {
                                    profil ? (

                                        <div className="register-pdp" style={{ backgroundImage: `url(${profil})` }}>
                                            <label for="inputFile">Choisir une photo de profil</label>
                                        </div>

                                    ) : (

                                        <div className="register-pdp">
                                            <label for="inputFile">Choisir une photo de profil</label>
                                        </div>

                                    )
                                }

                            </div>

                            <div className="input-group mb-5">
                                <input type="file" name="photo" className="displayNone" id="inputFile" onChange={recupProfil} />
                            </div>

                            <div className="input-group mb-3">
                            <div class="alert alert-danger displayNone  " role="alert w-100" style={{position:'relative'}}>
                                   <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faCircleExclamation} style={{fontSize:'20px'}} className="pe-2"/>
                                        <div className="w-100"><strong className="pe-4">{msgError}</strong></div>
                                        <button type="button" class="btn-close ms-3" onClick={()=> document.querySelector('.alert-danger').classList.add('displayNone')} style={{position:'absolute' , top:'0', right:'0' , fontSize:'15px' , padding: '10px 8px 8px 4px' }}></button>
                                   </div>
                            </div>
                            </div>

                            <div className="col-md-6 mb-4">
                                <label for="nom" className="form-label">Nom</label>
                                <input type="text" name="nom" id="nom" className="form-control form-control-md bg-light" onChange={handleChange} required />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label for="prenom" className="form-label">Prénom</label>
                                <input type="text" id="prenom" name="prenom" className="form-control form-control-md bg-light" onChange={handleChange} required />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label for="email" className="form-label">Email</label>
                                <input type="email" id="email" name="email" className="form-control form-control-md bg-light" onChange={handleChange} required />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label for="adresse" className="form-label">Adresse</label>
                                <input type="text" id="adresse" name="adresse" className="form-control form-control-md bg-light" onChange={handleChange} required />
                            </div>

                            <div className="col-md-12 mb-4">
                                <label for="password" className="form-label">Mot de passe <small>(Le mot de passe doit comporter au moins 6 caractères)</small></label>
                                <input type="password" id="password" name="mot_de_passe" className="form-control form-control-md bg-light" onChange={handleChange} required />
                            </div>

                            <div className="col-md-12 mb-5">
                                <label for="confirmPassword" className="form-label">Confirmation mot de passe</label>
                                <input type="password" id="confirmPassword" name="confirm_mot_de_passe" className="form-control form-control-md bg-light" onChange={handleChange} required />
                            </div>

                            <div className="col-md-12 mb-4 d-flex justify-content-center align-items-center">

                                { loading ? (

                                <button className="btn btn-auth-load w-50 fs-6" type="button" disabled>
                                <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                <span role="status"> Veuillez patienter...</span>
                                </button>

                            ) : (

                                <button type = "submit" className="btn btn-auth w-50 fs-6">Créer le compte</button>
                            )}
                               
                            </div>



                        </form>

                    </div>

                </div>

            </div>

        </div>
    )
}