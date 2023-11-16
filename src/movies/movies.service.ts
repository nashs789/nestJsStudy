import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { DoWithLogger } from 'src/do-with-logger/do-with-logger';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id);    // +: string -> number

        if(!movie){
            throw new NotFoundException(`Movie with ID: ${id} not found.`);
        }

        return movie;
    }

    deleteOne(id: number): void {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    createMovie(movieData: CreateMovieDto): void {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        });
    }

    update(movieId: number, movieData: UpdateMovieDto){
        const movie = this.getOne(movieId);

        this.deleteOne(movieId);
        this.movies.push({...movie, ...movieData});
    }
}
