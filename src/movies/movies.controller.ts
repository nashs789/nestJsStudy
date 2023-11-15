import { Controller, Delete, Get, Param, Post, Put, Patch, Body, Query, Req, Res } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

// controller entry point
@Controller('movies')
export class MoviesController {

    constructor(
        private readonly movieService: MoviesService
    ) {}
    
    @Get()
    //getAll(@Req() req, @Res() res): Movie[]{ express 객체임 req, res
    //res.json() 도 express
    getAll(): Movie[]{
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
