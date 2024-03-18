const passport = require('passport');
require('./passportCb');

const securiteCb = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(200).json({ message_error: "Accès interdit" });
        }
        req.user = user;
        next();
    })(req, res, next);
};

// Exportez la fonction de middleware utilisée par passport.authenticate
module.exports = securiteCb;