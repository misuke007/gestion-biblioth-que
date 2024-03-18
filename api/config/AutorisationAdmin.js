const passport = require('passport');
require('./passportAdmin');

const AutorisationAdmin = (req, res, next) => {
    passport.authenticate("admin", { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(200).json({ message_error: "Accès interdit à part les admins!!!" });
        }
        req.user = user;
        next();
    })(req, res, next);
};


module.exports = AutorisationAdmin;