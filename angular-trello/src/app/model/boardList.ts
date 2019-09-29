import { TaskList } from './tasklist';

//This is the model file for board
export class BoardList {

    tasklistId: string = undefined;
    taskListName: string = undefined;
    isDefault: number = 1;
    taskList: Array<TaskList>= new Array<TaskList>();
    updatedOn: Date = new Date();
    isUpdate?: boolean = false;
}

