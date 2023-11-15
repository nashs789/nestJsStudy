import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { DoWithLoggerModule } from './do-with-logger/do-with-logger.module';
import * as winston from 'winston'
import {
    utilities as nestWinstonModuleUtilities,
    WinstonModule
} from 'nest-winston';

@Module({
    imports: [
        DoWithLoggerModule
      , MoviesModule
      , ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `.${process.env.NODE_ENV}.env`
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
export class AppModule {}