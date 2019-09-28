import { BoardList } from './boardList';

//This is the model file for board
export class Board {

    boardId: string = undefined;
    isExist: boolean = false;
    boardName: string = undefined;
    boardList:Array<BoardList> = new Array<BoardList>();

}

