
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Recherche(){

    return (

       
            <div className=" section-recherche">
                <div className="section-recherche-bg ">
                    
                    <form action="" className="formHomeSearch row justify-content-center align-items-center p-0" >
            
                       <div className='select col-sm-12 col-md-2 col-lg-2 p-0  '>
                        <select name="" id="" className='w-100 ps-1'>
                            <option selected value="titre">Recherche par titre</option>
                            <option value="auteur">Recherche par auteur</option>
                        </select>
                       </div>


                        <div className='input col-sm-12 col-md-6 col-lg-6 p-0'>
                            <input type="text" name='search' placeholder = 'Chercher ' className=' ps-2  '/>
                            <button><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                        </div>
                       
                    </form>

                </div>
            </div>
        
    )
}