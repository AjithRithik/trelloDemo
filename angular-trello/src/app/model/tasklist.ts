//This is the model file for board
export class TaskList {

    taskId: string = undefined;
    taskName: string = undefined;
    createdOn: Date = new Date();
    updatedOn: Date = new Date();
    showEdit:boolean = false;
    showUpdate:boolean = false;
    disabled: boolean = false;
}
