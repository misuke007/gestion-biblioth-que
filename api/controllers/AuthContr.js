const { Utilisateur , Cb } = require('../models')
const {ajout , miseJour , supprimer , voirTout, voirUn , recherche} = require('./ContrBase')
const {nouveauNom, enregistrement} = require('../library/optionFichier')
const bcrypt = require('bcryptjs')
const constante = require('../constantes/constantes')
const jwt = require('jsonwebtoken')




Utilisateur.hasOne(Cb)
Cb.belongsTo(Utilisateur)



exports.enregistrementMembre = (req, res) => {

    const {nom , prenom , adresse , email , mot_de_passe} = req.body
    const {photo} = req.files

    const passCrypte = bcrypt.hashSync(mot_de_passe , 12)
    const couverture = nouveauNom(photo)
    enregistrement(photo , couverture)
    ajout(req , res , Utilisateur , {nom , prenom , adresse , email , badge : 'membre' , statut : "en attente" , photo : couverture , mot_de_passe : passCrypte })

    
}

exports.verificationCarte = async(req, res) => {

    const {numero  , cvv  , date_expiration} = req.body

    try{

        const carte = await Cb.findOne({where:{numero , cvv }})
        const dateActuel = new Date()
        const dateExpi = new Date(date_expiration)

        if(carte){

            if(dateExpi > dateActuel){
    
               return res.status(200).json({valide: true , carteId : carte.id})
                
            }else{return res.status(200).json({valide : false , message_error : "Votre carte est expirée"})}
    

        }else{return res.status(200).json({valide : false , message_error : "Carte invalide"})}

    }catch(error){console.log(error)}
}



exports.validationPaiement = async(req, res) => {

    const {mot_de_passe , carteId} = req.body
    const droitMembre = 150

    try{

        let cbData = await Cb.findOne({where:{id:carteId}})
        let utilisateur = await Utilisateur.findOne({where:{id:req.user.id}})

        if(mot_de_passe == cbData.mot_de_passe){

            if(droitMembre > cbData.somme){

            return res.status(200).json({message_error : `Vous n'avez pas assez d'argent pour payez le droit! Veuillez consulter votre solde`})

            }else{

            cbData.somme -= 150
            await cbData.save()
            utilisateur.statut = "actif"
            await utilisateur.save()
            return res.status(200).json({message : `Paiement validé! reconnectez-vous pour plus d'option `})

            }


        }else{

           return res.status(200).json({message_error : "Mot de passe incorrecte!"})
        }


    }catch(error){console.log(error)}
    



}




exports.login = async(req, res) => {

    const {email , mot_de_passe} = req.body

    try{

        const utilisateur = await Utilisateur.findOne({where:{email}})

        if(!utilisateur) return res.status(200).json({message_error : "Votre e-mail est invalide!"})
        const verificationMdp = bcrypt.compareSync(mot_de_passe , utilisateur.mot_de_passe)
        if(!verificationMdp) return res.status(200).json({message_error : "Mot de passe invalide!"})

        const token = jwt.sign({id : utilisateur.id , email : utilisateur.email} , 'secret')
        return res.status(200).json({token}) 
        

    }catch(error){console.log(error)}

}
