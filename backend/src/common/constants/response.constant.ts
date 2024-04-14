export class ResponseDataClass<T>{
    data: T | T[];
    statusCode: number;
    message: string;
    error?: any

    constructor(data: T | T[], statusCode: number, message: string, error?: T) {
        this.data = data,
        this.statusCode = statusCode,
        this.message = message,
        this.error = error

        return this
    }

}