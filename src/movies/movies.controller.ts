import { Controller, Delete, Get, Param, Post, Put, Patch, Body, Query, Req, Res, Logger, Inject, LoggerService, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { DoWithExceptions } from 'src/do-with-exception/do-with-exception';

// controller entry point
@Controller('movies')
export class MoviesController {

    //private looger = new Logger('BoardController');

    constructor(
        private readonly movieService: MoviesService,
        // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
        @Inject(Logger) private readonly logger: LoggerService,
        @Inject(DoWithExceptions) private readonly doWithExceptions: DoWithExceptions
    ) {}
    
    @Get()
    //getAll(@Req() req, @Res() res): Movie[]{ express 객체임 req, res
    //res.json() 도 express
    getAll(): Movie[]{
        throw new InternalServerErrorException();
        //throw this.doWithExceptions.NotPermitted;
        return this.movieService.getAll();
        //return 'This will return all movies.';
    }

    @Get('/:id')
    getOne(@Param('id') movieId: number): Movie{
        return this.movieService.getOne(movieId);
        //return `This will return one movie with the id: ${movieId}.`;
    }

    @Post()
    createMovie(@Body() movieData: CreateMovieDto){
        this.logger.log(`log = ${JSON.stringify(movieData)}`);
        return this.movieService.createMovie(movieData);
        //return movieData;
        //return `this will create a movie.`;
    }

    @Delete('/:id')
    removeMovie(@Param('id') movieId: number){
        return this.movieService.deleteOne(movieId);
    }

    @Patch('/:id')
    updateMovie(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto){
        return this.movieService.update(movieId, updateData);
        // return {
        //     updateMovie: movieId,
        //     ...updateData
        // }
        //return `This will patch a movie with the id ${movieId}.`;
    }
    
    // @Put(':/id')
    // updateMovie(@Param('id') movieId: string){
    //     return `This will update a movie with the id ${movieId}.`;
    // }
}
