const express = require('express')
const router = express.Router()


const { 

    ajoutAdmin , 
    modifAdmin,
    suppprimerUtilisateur,
    voirToutMembre,
    voirToutAdmin,
    voirUnMembre,
    voirUnAdmin, 
    paiementMembre,
    disponibilitéLivre} = require('../controllers/AdminContr')






router.get('/toutAdmin' , voirToutAdmin)
router.get('/toutMembre' , voirToutMembre)
router.get('/unMembre/:id' , voirUnMembre)
router.get('/unAdmin/:id' , voirUnAdmin)
router.post('/ajoutAdmin' ,ajoutAdmin )
router.put('/miseJourAdmin/:id' ,modifAdmin )
router.delete('/supprimerUtilisateur/:id' , suppprimerUtilisateur)
router.post('/paiementMembre/:id' , paiementMembre)
router.get('/disponibilite' , disponibilitéLivre)

module.exports = router