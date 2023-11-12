import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    // 생성자 안에서 접근 제한자와 같이 쓰이면 class의 property로 등록된다.
    constructor(private boardService: BoardsService) {}

    @Get('/')
    getAllBoard(): Board[]{
        return this.boardService.getAllboards();
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Board {
        return this.boardService.createBoard(createBoardDto);
    }

    // @Param() params: string[]
    @Get('/:id')
    getBoardById(@Param('id')id: string): Board { 
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id')id: string): void {
        this.boardService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: string, 
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
        ): Board{
        return this.boardService.updateBoardStatus(id, status);
    }
}