import { Controller } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    // 생성자 안에서 접근 제한자와 같이 쓰이면 class의 property로 등록된다.
    constructor(private boardService: BoardsService) {}
}
