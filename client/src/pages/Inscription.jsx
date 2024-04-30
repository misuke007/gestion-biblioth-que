
import { useAuth } from "../AuthContext/AuthContext"
import { useEffect, useState } from "react"
import bgRegisterImg from "../assets/images/i want cartoon style book images in png.jpg"





export default function Inscription() {

    let { getConnection, connection, role } = useAuth()
    let [profil, setProfil] = useState(null)


    
    useEffect(() => {

        getConnection()

    }, [])


    const recupProfil = (e) => {

        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onloadend = () => { setProfil(reader.result) }

        if (file) reader.readAsDataURL(file);
    }


    const handleChange = (e) => {



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

                        <form action="" className="row">
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
                                <div class="alert alert-danger alert-dismissible" role="alert w-100">
                                    <div className="w-100"></div>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>

                            <div className="col-md-6 mb-4">
                                <label for="nom" className="form-label">Nom</label>
                                <input type="text" name="nom" id="nom" className="form-control form-control-md bg-light" onChange={handleChange} />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label for="prenom" className="form-label">Prénom</label>
                                <input type="text" id="prenom" name="prenom" className="form-control form-control-md bg-light" onChange={handleChange} />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label for="email" className="form-label">Email</label>
                                <input type="email" id="email" name="email" className="form-control form-control-md bg-light" onChange={handleChange} />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label for="adresse" className="form-label">Adresse</label>
                                <input type="text" id="adresse" name="adresse" className="form-control form-control-md bg-light" onChange={handleChange} />
                            </div>

                            <div className="col-md-12 mb-4">
                                <label for="password" className="form-label">Mot de passe</label>
                                <input type="password" id="password" name="amot_de_passe" className="form-control form-control-md bg-light" onChange={handleChange} />
                            </div>

                            <div className="col-md-12 mb-4">
                                <label for="confirmPassword" className="form-label">Confirmation mot de passe</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" className="form-control form-control-md bg-light" onChange={handleChange} />
                            </div>

                            <div className="col-md-12 mb-4 d-flex justify-content-center align-items-center">
                                <button type="submit" className="btn btn-auth w-50 fs-6">Créer le compte</button>
                            </div>



                        </form>

                    </div>

                </div>
                {/* <div className="row register-box bg-white rounded-5">

                    <div className="col-md-6 left-box py-3">
                        <div className="register-img">
                            <img src={bgRegisterImg} className="img-fluid rounded-5" />
                        </div>
                    </div>

                    <div className="col-md-6 right-box">

                        <div className="row">

                            <form action="">

                                <div className="header-text mb-3">
                                    <h2 className="fs-3">Devenez membre de notre bibliothèque </h2>
                                </div>

                                <div className=" d-flex justify-content-center align-items-center bg-primary">

                                    <div className="pdp-register">
                                       
                                    </div>
                                  
                                    <input type="file" onChange={handleChange} />

                                </div>

                            </form>


                        </div>

                    </div>

                </div> */}

            </div>

        </div>
    )
}