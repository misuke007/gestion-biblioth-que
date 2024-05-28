import axios from "axios"
import { useState , useContext } from "react"
import {Navigate, useNavigate , Link , useLocation} from 'react-router-dom'
import loginImg from  "../assets/images/I want an image that represents people.jpg"
import { useAuth } from "../AuthContext/AuthContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';




let dataLogin = {

    email: "",
    mot_de_passe : ""
}


export default function Connexion(){

    let [data , setData] = useState(dataLogin)
    let [message_error , setMessage_error ] = useState("")
    let [loading , setLoading] = useState(false)
    let {login} = useAuth()
    const location = useLocation()
    const {successMsg} = location.state || {}

    console.log(successMsg)


    let navigate = useNavigate()

    let handleChange = (e) => {

        setData({

            ...data,
            [e.target.name] : e.target.value
        })
    }




    let Login = (e) => {

        e.preventDefault()
        setLoading(true)

        let alert = document.querySelector('.alert')
        

        axios.post(`http://localhost:9000/auth/login` , data)
        .then((res)=>{

            if(res.data.message_error){

                alert.classList.remove('displayNone')
                setMessage_error(res.data.message_error)

            }else{


                login(res.data.token , res.data.badge)
                
                if(res.data.badge === "ADMIN"){

                    navigate('/')
                    
                }else{


                    navigate('/')


                }

            }
        })

        .catch((error) => {

            console.log(error)
        })


        .finally(() => {

            setLoading(false)
        })
    }

    return(

       <div>
       
       
       <div className="container-fuild min-vh-100 bg-login">

        <div className = "cover  d-flex justify-content-center align-items-center">
            <div className="row bg-white shadow rounded-5 login-box ">

                <div className=" col-md-6 left-box rounded-5 d-flex justify-content-center align-items-center py-3">

                    <div className="feature-img">
                        <img src={loginImg} className = "img-fluid  rounded-5 "/>
                    </div>

                </div>

                <div className=" col-md-6 right-box p-4">

                    <div className="row">

                        <form action="" onSubmit={Login}>

                        <div className="header-text mb-5">
                        <h2 className="logoBibliotheque">Bibliothèque<span className = "biblioTitre">Éclat</span></h2>
                        <p>Connectez-vous pour profiter pleinement de notre application</p>
                        </div>

                        <div className="input-group">

                            <div class="alert alert-danger displayNone loginError w-100" role="alert" style={{position:'relative'}}>
                                   <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faCircleExclamation} style={{fontSize:'20px'}} className="pe-2"/>
                                        <div className="w-100"><strong>{message_error}</strong></div>
                                        <button type="button" class="btn-close ms-3" onClick={()=> document.querySelector('.loginError').classList.add('displayNone')} style={{position:'absolute' , top:'5px', right:'3px' , fontSize:'12px' }}></button>
                                   </div>
                            </div>


                            {
                                // message pour les inscriptions validées

                                successMsg && (
                                    // <div className = "alert alert-success w-100 p-2 text-center alert-dismissible loginError">{successMsg}</div>

                                    <div class="alert alert-success  loginError w-100" role="alert" style={{position:'relative'}}>
                                        
                                        <div className="d-flex align-items-center">
                                        <FontAwesomeIcon icon={faCircleCheck} style={{fontSize:'20px'}} className="pe-2"/>
                                            <div className="w-100"><strong>{successMsg}</strong></div>
                                            <button type="button" class="btn-close ms-3" onClick={()=> document.querySelector('.alert-success').classList.add('displayNone')} style={{position:'absolute' , top:'5px', right:'3px' , fontSize:'12px' }}></button>
                                        </div>
                                        
                                    </div>
                                )

                               
                            }
                            
                        </div>

                        <div className="input-group mb-4">
                            <input type="email" className="form-control form-control-lg bg-light fs-6 email" placeholder="Email" name="email" onChange={handleChange} />
                        </div>

                        <div className="input-group mb-4">
                            <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Mot de passe" name="mot_de_passe"  onChange={handleChange} />
                        </div>

                        <div className="forgot mb-5">
                            <small><a href="#">Mot de passe oublié ?</a> </small>
                        </div>

                        <div className="input-group mb-3">

                            { loading ? (

                                <button className="btn btn-auth-load w-100 fs-6" type="button" disabled>
                                <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                <span role="status"> Veuillez patienter...</span>
                                </button>

                            ) : (

                                <button type = "submit" className="btn btn-auth w-100 fs-6">Se connecter</button>
                            )}

                        </div>
                        
                        <div className="input-group">
                        <small className="mt-3">Vous n'avez pas de compte? <Link to ="/inscription">Inscription</Link></small>
                        </div>
                        </form>
                        

                    </div>

                </div>

            </div>   
          </div>
       </div>
       
       
       </div>
        
    )
}