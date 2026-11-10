const Customers = require('../schemas/customerModel.js');     
const bcrypt = require('bcrypt')
const { ValidationError, InvalidUserError, AuthenticationFailed, InvalidName } = require('../errors/CustomError.js');

const saltRounds = 5


class CustomerModel {
    static async findAuthUser({ user_name, password }) {
        const user = await Customers.findOne({ user_name: user_name })
        if (!user) {
            throw new InvalidUserError("No such user in database")
        }
        const verify_password = await bcrypt.compare(password, user.password )
        if (!verify_password) {
            throw new AuthenticationFailed("Passwords don't match")
        }
        return user
    }
    
    static async addUser({ data }) {
        const age = parseInt(data['age'])
        const name = data['name']
        if (age < 21) {
                throw new ValidationError("Customer Under required age limit")
            }
            if (typeof name !== 'string') {
                throw new InvalidName("Name must be a string")
            }

            const hashed_pass = bcrypt.hashSync(data.password, saltRounds)
    
            const customer = new Customers({
                "user_name": data['user_name'],
                "name": data['name'],
                "age": age,
                "password": hashed_pass,
                "email": data['email']
            });
    
            await customer.save()
    }
}


module.exports = CustomerModel