import { HttpStatus, Injectable } from "@nestjs/common";

export class DoWithException extends Error {
    name: string;
    errorCode: number;
    statusCode: number;

    constructor(message, errorCode, statusCode){
        super(message);
        this.name = 'DoWithException';
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }

    getStatus(){
        return this.statusCode;
    }
}

// 밑의 코드들은 샘플 코드

enum DoWithErrorCode {
    TestError = '0010'
}

enum DoWithErrorMsg {
    TestError = 'This is not permmited'
}

@Injectable()
export class DoWithExceptions {
    NotPermitted = new DoWithException(DoWithErrorMsg.TestError, DoWithErrorCode.TestError, HttpStatus.BAD_REQUEST);
}