import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class DoWithExceptionFilter<T> implements ExceptionFilter {
    constructor(
        private readonly logger: Logger
    ) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        if(exception.name === 'DoWithException'){
            this.logger.debug("DoWithException");
        } else {
            this.logger.debug("HTTPException");
        }
        this.logger.error("여기 에러 났습니다 동네 사람들!!!", exception);

        response.status(status)
                .json({
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                });
    }
}