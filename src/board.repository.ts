import { EntityRepository, Repository } from 'typeorm'
import { Board } from "./boards/board.entity";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

}