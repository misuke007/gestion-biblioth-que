
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import SlickSettings from '../utils/SlickSettings';
import img from '../assets/images/books-1204029_1280.jpg'
import img2 from '../assets/images/i want cartoon style book images in png.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';




export default function NouveauT() {


  const cards = [
    {
      title: 'Card 1',
      text: 'This is card 1.',
      imgSrc: 'https://via.placeholder.com/300',
    },
    {
      title: 'Card 2',
      text: 'This is card 2.',
      imgSrc: 'https://via.placeholder.com/300',
    },
    {
      title: 'Card 2',
      text: 'This is card 2.',
      imgSrc: 'https://via.placeholder.com/300',
    },
    {
      title: 'Card 2',
      text: 'This is card 2.',
      imgSrc: 'https://via.placeholder.com/300',
    },
    {
      title: 'Card 2',
      text: 'This is card 2.',
      imgSrc: 'https://via.placeholder.com/300',
    },
    {
      title: 'Card 2',
      text: 'This is card 2.',
      imgSrc: 'https://via.placeholder.com/300',
    },
  
  ];




  return (


    <div className='container-fluid'>
      
      
      <h2 className='sectionTitle position-relative pb-2 mt-5 d-inline-block '>Nouveautés</h2>
     

      <div className='row mt-4 sectionNouveaute py-4  '>
         

        <Slider {...SlickSettings}>
          {

            cards.map((value , index) => {

              return(

                <div className='col-sm-12 col-md-4 col-lg-4 p-2'>
                <div className='cardLivre col-md-12'>
                  <div className='row'>
                      <div className='card-image  col-sm-5 col-md-5  p-0 m-0 d-flex justify-content-center align-items-center'>
                          <img src={img2} alt="" className='img-fluid'/>
                      </div>
    
                      <div className='card-information col-sm-5 col-md-7 ps-4 py-3'>
                        <h5 className='mt-1 cardTitle'>Prison d'askaban</h5>
                        
                        <ul className='p-0 mt-3'>
                          <li><small>Auteur : </small></li>
                          <li><small>Catégorie : </small></li>
                          <li><small>Popularité : </small></li>
                        </ul>
    
                        <div className='d-flex justify-content-center align-items-center'>
                        <button className = 'cardButton'>
                           <span className='icon'><FontAwesomeIcon icon={faBook}></FontAwesomeIcon></span>
                           <span className='text'>Emprunter</span> 
                        </button>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
              )
            })
          }
        </Slider>

          
      </div>
    </div>
    
  )
};

