const express = require('express')
const router = express.Router()
const {ajoutReservation, validationEmprunt, rechercheReservation, historique} = require('../controllers/EmpruntContr')


router.post('/ajoutReservation' , ajoutReservation)
router.post('/validationEmprunt' , validationEmprunt)
router.post('/rechercheResa' , rechercheReservation)
router.get('/historique' , historique)


module.exports = router
