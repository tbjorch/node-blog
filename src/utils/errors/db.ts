

export class NoResourceFoundException extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class DuplicateValueException extends Error {
    constructor(message: string) {
        super(message);
    }
}