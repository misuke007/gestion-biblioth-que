import { useEffect, useState, useRef } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import axios from "axios";
import logoMaster from "../assets/images/png-clipart-mastercard-logo-mastercard-credit-card-payment-visa-nyse-ma-mastercard-logo-text-logo.png"
import logoVisa from "../assets/images/logo-visa-carte-1.png"
import logoCb from "../assets/images/logo-cb.jpg"
import logoDiscover from "../assets/images/DGN_AcceptanceMark_FC_Hrz_RGB.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import Modal from 'bootstrap/js/dist/modal'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

let dataCb = {

    numero: "",
    date_expiration: "",
    cvv: ""

}

let dataPaiement = {

    mot_de_passe : ""
}


export default function ValidationCarte() {

    let { cbConnection, getTokenPayment } = useAuth()
    let [loading, setLoading] = useState(false)
    let [msgError, setMsgError] = useState("")
    let [data, setData] = useState(dataCb)
    let [carteId , setCarteId] = useState(null)
    let[modalInstance , setModalInstance] = useState(null)
    let [paiement , setPaiement] = useState(dataPaiement)
    let [loadingBtnModal , setLoadingBtnModal] = useState(false)
    const modalRef = useRef(null)
    
   
    
    let navigate = useNavigate()
  
  


    useEffect(() => {
        
        getTokenPayment()
    
    })


    const config = {headers: {'Authorization': `Bearer ${cbConnection}`} }
    let formData = new FormData()


    const handleChange = (e) => {

        setData({

            ...data,
            [e.target.name]: e.target.value
        })

    }


   

    const handleDataPaye = (e) => {

        setPaiement({

            ...paiement,
            [e.target.name] : e.target.value
        })
    }
    

    
    const handlePayement = () => {

        setLoadingBtnModal(true)

        formData.append('carteId' , carteId)
        formData.append('mot_de_passe' , paiement.mot_de_passe)

        axios.post(`http://localhost:9000/auth/paiement`, formData , config)
        
        .then((res) => {

            const data = res.data

            if(data.serverAuthMsg){

                // serverAuth => info depuis le serveur concernant l'autorisation 

                document.querySelector('.modalMsgError').classList.remove('displayNone')
                setMsgError(data.serverAuthMsg)
                setLoadingBtnModal(false)

            }else if(!data.valide){

                // valide => etat pour indiquer si l'inscription est validé ou non 

                document.querySelector('.modalMsgError').classList.remove('displayNone')
                setMsgError(data.server_msg)
                setLoadingBtnModal(false)

                
            }else{

                modalInstance.dispose()
                setLoadingBtnModal(false)
                localStorage.removeItem('CbToken')
                navigate('/connexion' , {state : {successMsg :`${data.server_msg}`}})
                
            }

        })

        .catch((error) => {

            console.log(error)
        })

        .finally(() => console.log(''))
    }

       

    const handleSubmit = (e) => {

        setLoading(true)
        e.preventDefault()
        
        formData.append('numero', data.numero)
        formData.append('date_expiration', data.date_expiration)
        formData.append('cvv', data.cvv)

        

        axios.post(`http://localhost:9000/auth/verificationValiditeCarte`, formData, config)

            .then((res) => {

                const data = res.data

                
                if (data.serverAuthMsg) {
                  
                    document.querySelector('.formMsgError').classList.remove('displayNone')
                    setMsgError(data.serverAuthMsg)

                } else if(!data.valide) {
                   
                    document.querySelector('.formMsgError').classList.remove('displayNone')
                    setMsgError(data.server_msg)

                }else{

                    
                    setCarteId(data.carteId)
                    const modal = new Modal(modalRef.current)
                    setModalInstance(modal)
                    modal.show()
                }
            })

            .catch((error) => {

                console.log(error)
            })

            .finally(() => setLoading(false))


    }



    return (

        <div>
            {


                <div className="container-fluid p-0  min-vh-100 ">


                    <div className="row bg-white m-0">

                        {/* conteneur image */}

                        <div className=" left-box-register ps-0 col-md-3"></div>

                        {/* fin conteneur image */}


                        {/* conteneur form */}

                        <div className=" right-box-register col-md-9 px-4 pt-3 px-5">

                            <div className="header-text mb-5">
                                <h2 className="logoBibliotheque"> Bibliothèque<span className="biblioTitre">Éclat</span></h2>
                                <p>Veuillez nous fournir  les informations de votre carte pour valider votre inscription</p>
                            </div>

                            <div className="d-flex justify-content-center align-items-center">


                                <form action="" className="row formValidation mt-5" onSubmit={handleSubmit}>

                                    {/* modal confirmation paiement */}


                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-2 logoBibliotheque" id="exampleModalLabel"> Bibliothèque<span className="biblioTitre">Éclat</span></h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <small className="modal-title">Votre carte est valide <FontAwesomeIcon icon={faCircleCheck} style={{ color: "green" }} className="ms-1" /><br /> Saisissez votre mot de passe pour payer le droit de <strong>150 euros</strong></small>
            
                                                    <div class="alert alert-danger displayNone modalMsgError  " role="alert w-100" style={{position:'relative'}}>
                                                        <div className="d-flex align-items-center">
                                                            <FontAwesomeIcon icon={faCircleExclamation} style={{fontSize:'20px'}} className="pe-2"/>
                                                                <div className="w-100"><strong className="pe-4">{msgError}</strong></div>
                                                                <button type="button" class="btn-close ms-3" onClick={()=> document.querySelector('.alert-danger').classList.add('displayNone')} style={{position:'absolute' , top:'0', right:'0' , fontSize:'15px' , padding: '10px 8px 8px 4px' }}></button>
                                                        </div>
                                                    </div>

                                                    <div className="input-group mt-4">
                                                        <input type="password" className="form-control" placeholder="Mot de passe" name="mot_de_passe" onChange={handleDataPaye} />
                                                    </div>
                                                </div>
                                                <div class="modal-footer">

                                                {loadingBtnModal ? (

                                                        <button className="btn btn-auth-load w-50 fs-6" type="button" disabled>
                                                            <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                                            <span role="status"> Vérification en cours...</span>
                                                        </button>

                                                        ) : (

                                                        <button type="submit" className="btn btn-auth w-50 fs-6" onClick={handlePayement}>Payer</button>
                                                        )}
                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* find modal confirmation paiement  */}



                                    <div className="input-group mb-3">

                                        <div class="alert alert-danger displayNone formMsgError  " role="alert w-100" style={{position:'relative'}}>
                                            <div className="d-flex align-items-center">
                                                <FontAwesomeIcon icon={faCircleExclamation} style={{fontSize:'20px'}} className="pe-2"/>
                                                    <div className="w-100"><strong className="pe-4">{msgError}</strong></div>
                                                    <button type="button" class="btn-close ms-3" onClick={()=> document.querySelector('.formMsgError').classList.add('displayNone')} style={{position:'absolute' , top:'0', right:'0' , fontSize:'15px' , padding: '10px 8px 8px 4px' }}></button>
                                            </div>
                                         </div>
                                    </div>


                                    <div className="col-md-12 mb-4">

                                        <div className="logo d-flex mb-5">
                                            <div className="carteLogo logo-visa d-flex justify-content-center align-items-center"><img src={logoVisa} className="img-fluid" /></div>
                                            <div className="carteLogo ms-2 logo-cb  d-flex justify-content-center align-items-center"><img src={logoCb} className="img-fluid" /></div>
                                            <div className="carteLogo ms-2 logo-master  d-flex justify-content-center align-items-center" ><img src={logoMaster} className="img-fluid" /></div>
                                            <div className="carteLogo ms-2 logo-discover  d-flex justify-content-center align-items-center"><img src={logoDiscover} className="img-fluid" /></div>
                                        </div>

                                        <label for="coordonneeCarte" className="form-label">Coordonnées de la carte</label>
                                        <input type="text" id="coordonneeCarte" name="numero" className="form-control form-control-md bg-light" onChange={handleChange} required placeholder="Numéro" />
                                    </div>

                                    <div className="col-md-6 mb-4">
                                        <input type="text" name="date_expiration" className="form-control form-control-md bg-light" onChange={handleChange} required placeholder="Année-Mois-Jours" />
                                    </div>

                                    <div className="col-md-6 mb-5">
                                        <input type="text" name="cvv" className="form-control form-control-md bg-light" onChange={handleChange} required placeholder="cvv" />
                                    </div>

                                    <div className="col-md-12 mb-4 d-flex justify-content-center align-items-center">

                                        {loading ? (

                                            <button className="btn btn-auth-load w-50 fs-6" type="button" disabled>
                                                <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                                <span role="status"> Vérification en cours...</span>
                                            </button>

                                        ) : (

                                            <button type="submit" className="btn btn-auth w-50 fs-6">Vérifier</button>
                                        )}

                                    </div>



                                </form>
                            </div>

                        </div>

                        {/* fin conteneur form */}

                    </div>

                </div>


            }
        </div>
    )
}