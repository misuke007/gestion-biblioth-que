
const { Op } = require('sequelize')
const { Categorie, Livre, Reservation, Utilisateur, Notification } = require('../models')
const constante = require('../constantes/constantes')
const jwt = require('jsonwebtoken')

exports.ajout = async (req, res, table, data, passAdmin) => {


    if (table.getTableName() == "Utilisateurs") {

        try {

            const newData = table.build(data)
            const prevData = await newData.save()
            const token = jwt.sign({ id: prevData.id, email: prevData.email }, 'secret')

            return passAdmin ? res.status(200).json({ message: `Inscription réuissie`, token, passAdmin }) : res.status(200).json({ message: `Inscription réuissie`, token })

        } catch (error) { console.log(error) }


    } else if (table.getTableName() == "Reservations") {

        try {

            const dataLivre = await Livre.findOne({ where: { id: data.LivreId } })

            // vérification d'exemplaire 

            if (dataLivre.exemplaire !== 0) {

                const newData = table.build(data)
                const dataLivre = await Livre.findOne({ where: { id: data.LivreId } })
                dataLivre.exemplaire -= 1
                await dataLivre.save()
                const prevData = await newData.save()
                const utilisateurConcerne = await prevData.getUtilisateur()
                const newNotification = Notification.build({ UtilisateurId: utilisateurConcerne.id, NotificationType: "Reservation", message: `${utilisateurConcerne.nom} ${utilisateurConcerne.prenom} a fait une réservation pour le livre ${dataLivre.titre}.` })
                await newNotification.save()

                return res.status(200).json({ message: `Réservation réussie pour le livre ${dataLivre.titre}` })

            } else { return res.status(200).json({ message_error: `Ce livre n'est pas encore disponible pour le moment!` }) }

        } catch (error) { console.log(error) }


    } else if (table.getTableName() == 'Notifications') {

        // Ajout notifications pour les membres

        try {

            const newData = table.build(data)
            await newData.save()

        } catch(error){console.log(error)}

    } else {

        try {

            const newData = table.build(data)
            await newData.save()
            return res.status(200).json({ message: ` Ajouté avec succès!` })

        } catch (error) { return res.status(500).json({error : constante.error500 }) }
    }



}



exports.miseJour = async (req, res, table, data, id) => {

    try {

        table.update(data, { where: { id } })
        return res.status(200).json({ message: 'Mise à jour réussie!' })

    } catch (error) { return res.status(500).json({ error: constante.error500 }) }
}



exports.supprimer = async (req, res, table, id) => {

    try {

        await table.destroy({ where: { id } })
        return res.status(200).json({ message: 'Supprimé avec succès!' })

    } catch (error) { return res.status(500).json({ error: constante.error500 }) }

}



exports.voirTout = async (req, res, table, badge) => {

    let data

    try {

        switch (badge) {

            case 'membre': {

                data = await table.findAll({ where: { badge: "membre", statut: "actif" } })
                break
            }

            case 'ADMIN': {

                data = await table.findAll({ where: { badge: "ADMIN" } })
                break
            }


            default: {

                data = await table.findAll()
                break

            }
        }

        return res.status(200).json({ message: `${data.length} ${table.getTableName()}`, data })

    } catch (error) { console.log(error) }
}




exports.voirUn = async (req, res, table, id, badge) => {

    let data

    try {


        switch (badge) {

            case 'membre': {

                data = await table.findOne({ where: { id, badge: "membre", statut: "actif" } })
                break
            }

            case 'ADMIN': {

                data = await table.findOne({ where: { id, badge: "ADMIN" } })
                break
            }


            default: {
                findOne

                data = await table.findOne({ where: { id } })
                break

            }
        }

        return res.status(200).json({ data })

    } catch (error) { console.log(error) }
}



exports.recherche = async (req, res, table, rech, colonne) => {

    let whereClause = {}


    if (table.getTableName() == 'Livres') {

        try {

            whereClause[colonne] = { [Op.like]: `%${rech}%` }
            const resultat = await table.findAll({ include: Categorie, where: whereClause })

            if (resultat.length !== 0) {

                return res.status(200).json({ message: `Vous avez ${resultat.length} résultat(s)`, data: resultat })

            } else { return res.status(200).json({ message_error: 'Aucun résultat' }) }


        } catch (error) { return res.status(500).json({ error: constante.error500 }) }



    } else if (table.getTableName() == 'Reservations') {

        try {

            const dataReservation = await Reservation.findAll({
                include: [

                    {
                        model: Utilisateur,
                        where: {
                            [Op.or]: [

                                { nom: { [Op.like]: `${rech}` } },
                                { prenom: { [Op.like]: `${rech}` } }

                            ]
                        }

                    }
                ]
            })

            return dataReservation.length !== 0 ? res.status(200).json({ dataReservation }) : res.status(200).json({ message_error: `Aucun resultat!` })

        } catch (error) { console.log(error) }

    }
}