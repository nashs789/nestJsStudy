import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DoWithLogger } from './do-with-logger/do-with-logger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import * as winston from 'winston'
import {
    utilities as nestWinstonModuleUtilities,
    WinstonModule
} from 'nest-winston';
import { DoWithMiddlewareMiddleware } from './do-with-middleware/do-with-middleware.middleware';

/**
 * winston log level
 * error  : 0
 * warn   : 1
 * info   : 2
 * http   : 3
 * verbose: 4
 * debug  : 5
 * silly  : 6
 */

async function bootstrap() {
    const app = await NestFactory.create(AppModule,
        {
            logger: WinstonModule.createLogger({
                transports: [
                    new winston.transports.Console({
                        level : process.env.LOG_LEVEL,
                        format: winston.format.combine(
                            winston.format.timestamp(),
                            nestWinstonModuleUtilities.format.nestLike('DoWith', {
                              colors     : true,
                              prettyPrint: true
                            })
                        ),
                    }),
                ],
            }),
          //   logger: process.env.NODE_ENV === 'prod'
          // ? ['error', 'warn', 'log']
          // : ['error', 'warn', 'log', 'verbose', 'debug']
        }
    );
    //app.use(DoWithMiddlewareMiddleware);
    //app.useLogger(app.get(DoWithLogger));
    //app.useLogger(app.get(WINSTON_MODULE_PROVIDER));
    // Global Level의 Pipe 설정 (Built in Pipe)
    // ValidationPipe
    // ParseIntPipe 
    // ParseBoolPipe
    // ParseArrayPipe
    // ParseUUIDPipe
    // DefaultValuePipe
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    const port = process.env.PORT;
    
    await app.listen(port);
    Logger.log(`Application running on port ${port}`);
}
bootstrap();