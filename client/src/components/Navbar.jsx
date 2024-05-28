

import { useState} from "react"
import { Link } from "react-router-dom"
export default function Navbar() {

    const [activeIndex , setActiveIndex] = useState(0)

    const handleClick = (index) => {

        setActiveIndex(index)
    }


    return (

        
            <nav className="navbar  navbar-expand-lg fixed-top ">
                <div className="container-fluid">
                    <a className="navbar-brand me-auto logoBibliotheque" href="#">Bibliothèque<span className = "biblioTitre">Éclat</span></a>
                    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title fs-2 logoBibliotheque" id="offcanvasNavbarLabel">Bibliothèque<span className = "biblioTitre">Éclat</span></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className={`nav-link mx-lg-2 ${activeIndex === 0 ? 'active' : ''}`} aria-current="page" href="#" onClick={() => handleClick(0)}>Accueil</a>
                                </li>

                               

                                <li className="nav-item dropdown">
                                    <a className={`nav-link dropdown-toggle ${activeIndex === 1 ? 'active' : ''}` } href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={()=>handleClick(1)}>
                                    Catégories
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link to ="/categorie" className="dropdown-item">Action</Link></li>
                                        <li><Link to ="/" className="dropdown-item">Action1</Link></li>
                                        <li><Link to ="/categorie" className="dropdown-item">Action2</Link></li>
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <a className={`nav-link mx-lg-2 ${activeIndex === 2 ? 'active' : ''}`} aria-current="page" href="#" onClick={()=>handleClick(2)}>Populaires</a>
                                </li>

                                <li className="nav-item">
                                    <a className={`nav-link mx-lg-2 ${activeIndex === 3 ? 'active' : ''}`} aria-current="page" href="#" onClick={()=>handleClick(3)}>Emprunts</a>
                                </li>

                                <li className="nav-item">
                                    <a className={`nav-link mx-lg-2 ${activeIndex === 4 ? 'active' : ''}`} aria-current="page" href="#" onClick={()=>handleClick(4)}>Historiques</a>
                                </li> 

                            </ul>
                        </div>
                    </div>
                    <a href="#" className="nav-loginBtn">Se connecter</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>

        

    )
}