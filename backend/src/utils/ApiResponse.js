class ApiResponse {
    constructor(statusCode = 200, data = null, message = '') {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}

export default ApiResponse;
