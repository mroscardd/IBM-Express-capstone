const jwt = require('jsonwebtoken') 
const secretkey = 'secret'

function verifyToken(req, res, next) {
    const token = req.session.token
    if (typeof token !== 'undefined') {
        jwt.verify(token, secretkey, (err, authData) => {
            if (err){
                return res.status(403).send()
            } else {
                req.authData = authData
                next()
            }
    })
    } else {
        return res.status(401).json({mensagge: "Logging first"})
    }
}


module.exports = {verifyToken}