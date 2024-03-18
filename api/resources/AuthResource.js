const express = require('express')
const securiteCb = require('../config/securiteCb')
const router = express.Router()

const { 
    
    enregistrementMembre, 
    verificationCarte, 
    validationPaiement, 
    login, 
    } = require('../controllers/AuthContr')

router.post('/inscription' , enregistrementMembre)
router.post('/verificationValiditeCarte' ,  securiteCb , verificationCarte)
router.post('/paiement' , securiteCb , validationPaiement)
router.post('/login' , login)


module.exports = router