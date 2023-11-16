import { Logger, Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { DoWithExceptions } from 'src/do-with-exception/do-with-exception';

@Module({
    controllers: [MoviesController],
    providers: [MoviesService, Logger, DoWithExceptions]
})
export class MoviesModule {}
