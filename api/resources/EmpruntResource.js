const express = require('express')
const AutorisationAdmin = require('../config/AutorisationAdmin')
const AutorisationMembre = require('../config/AutorisationMembre')
const router = express.Router()
const {ajoutReservation, validationEmprunt, rechercheReservation, historique} = require('../controllers/EmpruntContr')



router.post('/ajoutReservation'  ,AutorisationMembre ,   ajoutReservation)
router.post('/validationEmprunt' ,AutorisationAdmin,  validationEmprunt)
router.post('/rechercheResa' ,AutorisationAdmin, rechercheReservation)
router.get('/historique' ,AutorisationAdmin ,  historique)


module.exports = router
