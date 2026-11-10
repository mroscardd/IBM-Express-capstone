const path = require('path'); 
const jwt = require('jsonwebtoken') 
const CustomerModel = require('../models/customerModel.js');
const secretkey = 'secret'


class ApiController {
    static async login(req, res, next) {
        const data = req.body;
        const user_name = data['user_name']
        const password = data['password']
        
        try {
            const user = await CustomerModel.findAuthUser({user_name, password})
            const token = jwt.sign({id: user._id, user_name: user_name}, secretkey)
            req.session.token = token
            res.cookie('username', user_name, { maxAge: 720000 })
            
            res.redirect('/')
        } catch (error) {
            next(error)
        }
    }

// POST endpoint for adding a new customer
    static async register (req, res, next) {
        const data = req.body;
        const age = parseInt(data['age'])
        const name = data['name']
    
        try {
            await CustomerModel.addUser({ data })
    
            return res.redirect('/')
        } catch (error) {
            next(error)
        }
    }


    static async private (req, res) {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'private.html'))
    }

    static async logout (req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error al destruir la sesión:", err)
            }
            res.clearCookie('username')
            return res.redirect('/')
        })
    }  
}

module.exports = ApiController