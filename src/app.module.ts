import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { DoWithLoggerModule } from './do-with-logger/do-with-logger.module';
import * as winston from 'winston'
import {
    utilities as nestWinstonModuleUtilities,
    WinstonModule
} from 'nest-winston';
import { consumers } from 'stream';
import { DoWithMiddlewareMiddleware } from './do-with-middleware/do-with-middleware.middleware';
import { DoWithMiddlewareModule } from './do-with-middleware/do-with-middleware.module';
import { DoWithExceptionFilterModule } from './do-with-exception-filter/do-with-exception-filter.module';
import { DoWithExceptionModule } from './do-with-exception/do-with-exception.module';

@Module({
    imports: [
        MoviesModule
      , DoWithMiddlewareModule
      , DoWithExceptionFilterModule
      , ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `./env/.${process.env.NODE_ENV}.env`
      })
      , WinstonModule.forRoot({
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
      })
    ],
    controllers: [AppController],
    providers: [],
})

export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(DoWithMiddlewareMiddleware)
                .forRoutes('');
    }
}