import { Controller, Get, Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Controller('/boards')
@Module({
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {} 