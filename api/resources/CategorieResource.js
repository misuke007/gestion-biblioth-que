const express = require('express')
const { ajoutCategorie, miseJourCategorie, supprimerCategorie, toutCategorie, unCategorie } = require('../controllers/CategorieContr')
const router = express.Router()


router.post('/categorie/ajout' , ajoutCategorie)
router.put('/categorie/miseJour/:id' , miseJourCategorie)
router.delete('/categorie/suppression/:id' , supprimerCategorie)
router.get('/categorie/tout' , toutCategorie)
router.get('/categorie/un/:id' , unCategorie)










module.exports = router