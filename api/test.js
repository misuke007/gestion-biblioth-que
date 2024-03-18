// const moment = require('moment')


// const date = moment('2024-03-11').startOf('days')
// const dateBdd = moment('2024-03-10').startOf('days')

// const result = dateBdd.diff(date , 'days')
// console.log(result)

const passport = require('passport');
require('./config/passportAdmin'); // Assurez-vous que le chemin vers votre configuration de Passport JWT est correct

// Créez une fonction pour simuler une requête et une réponse Express
const simulateExpressRequest = (token) => {
    const req = {
        headers: {
            authorization: `Bearer ${token}` 
        }
    };

    const res = {
        status: (statusCode) => ({
            json: (data) => console.log(data) // Log la réponse
        })
    };

    return { req, res };
};

// Appeler directement la fonction de vérification de la stratégie JWT
const testPassportJWT = (token) => {
    const { req, res } = simulateExpressRequest(token);

    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err || !user) {
            console.log("Accès interdit à part les Administrateurs");
        } else {
            console.log("Utilisateur authentifié :", user);
        }
    })(req, res);
};

// Appelez cette fonction avec un token JWT valide pour effectuer le test
testPassportJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImJhZGdlIjoiQURNSU4iLCJzdGF0dXMiOm51bGwsImlhdCI6MTcxMDQwODIwOH0.I-Y53J8kPAT-FyUni5NZZOsMRBt5ffYsttarcvljlGE");