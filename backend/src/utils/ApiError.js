class ApiError extends Error{
    constructor(
        statusCode = 400,
        message = "",
    ){
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError