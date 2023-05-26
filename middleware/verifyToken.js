const Users = require('../models/user').User;
const Todos = require('../models/todo').Todo;
const jwt = require('jsonwebtoken');

module.exports = {
    authenticateToken: (req, res, next) => {
        const auth = req.headers.authorization;

        if (auth) {
            const token = auth.split(' ')[1];

            jwt.sign(token, process.env.TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).send({
                        message: 'Invalid token provided'
                    });
                }

                req.user = user;
                next;
            });
        } else {
            res.status(401).send({
                message: 'Unauthorized'
            })
        }
    }
}