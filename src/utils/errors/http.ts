
export interface HttpError extends Error {
    statusCode: number;
}

export class BadRequest implements HttpError {
    name: string = "Bad Request";
    statusCode: number = 400;
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}

export class NotFound implements HttpError {
    name: string = "Not Found";
    statusCode: number = 404;
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}

export class InternalServerError implements HttpError {
    name: string = "Internal Server Error";
    statusCode: number = 500;
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}