/**
 * Custom Error Class: ValidationError
 *
 * Represents an error that occurs when validation fails.
 * Inherits from the built-in Error class.
 */
class ValidationError extends Error {
    constructor(message) {
        // Call the constructor of the parent class (Error)
        super(message);

        // Custom properties for the ValidationError
        this.statusCode = 407; // Custom error code
        this.name = "ValidationError"; // Custom error name
    }
}

/**
 * Custom Error Class: InvalidUserError
 *
 * Represents an error that occurs when dealing with an invalid user.
 * Inherits from the built-in Error class.
 */
class InvalidUserError extends Error {
    constructor(message) {
        // Call the constructor of the parent class (Error)
        super(message);

        // Custom properties for the InvalidUserError
        this.statusCode = 404; // Custom error code
        this.name = "InvalidUserError"; // Custom error name
    }
}

class InvalidName extends Error {
    constructor(message){
        super(message)
        this.statusCode= 407
        this.name = "InvalidName"
    }
}

/**
 * Custom Error Class: AuthenticationFailed
 *
 * Represents an error that occurs when authentication fails.
 * Inherits from the built-in Error class.
 */
class AuthenticationFailed extends Error {
    constructor(message) {
        // Call the constructor of the parent class (Error)
        super(message);

        // Custom properties for the AuthenticationFailed error
        this.statusCode = 401; // Custom error code
        this.name = "AuthenticationFailed"; // Custom error name
    }
}

module.exports = { ValidationError, InvalidUserError, AuthenticationFailed, InvalidName};