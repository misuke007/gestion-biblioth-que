const express = require('express')
const AutorisationAdmin = require('../config/AutorisationAdmin')
const AutorisationMembre = require('../config/AutorisationMembre')
const router = express.Router()

const {
    ajoutLivre,
    supprimerLivre,
    miseJourLivre, 
    toutLivre,
    unLivre ,
    rechercheLivre ,
    trierParCategorie,
    popularite,
    commentaire,
    reponse} = require('../controllers/LivreContr')





router.post('/livre/ajout' ,AutorisationAdmin,ajoutLivre )
router.post('/livre/recherche' ,rechercheLivre )
router.put('/livre/miseJour/:id' ,AutorisationAdmin,miseJourLivre )
router.delete('/livre/supprimer/:id' ,AutorisationAdmin, supprimerLivre)
router.get('/livre/tout' , toutLivre)
router.get('/livre/un/:id' , unLivre)
router.get('/livre/triParCategorie/:categorieId' , trierParCategorie)
router.get('/livre/popularite' , popularite)
router.post('/livre/commentaire/:id' ,AutorisationMembre, commentaire)
router.post('/livre/commentaire/reponse/:id' ,AutorisationMembre, reponse)





module.exports = router

