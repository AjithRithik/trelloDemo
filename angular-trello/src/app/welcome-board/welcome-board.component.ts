import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { CreateDialogComponent } from './../create-dialog/create-dialog.component';
import { BoardList } from './../model/boardList';
import { TaskList } from './../model/tasklist';
import { Board } from './../model/board';
import { Component, OnInit, ViewChild } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-welcome-board',
  templateUrl: './welcome-board.component.html',
  styleUrls: ['./welcome-board.component.scss']
})
export class WelcomeBoardComponent implements OnInit {

  /**variable Declaration**/
  boardDetails: Board = new Board();
  connectedTo = [];


  defaultValues:Array<BoardList> = [
    {
      tasklistId: uuid(),
      taskListName: 'To Do',
      isDefault: 1,
      taskList: new Array<TaskList>(),
      updatedOn: new Date()
   },
   {
      tasklistId: uuid(),
      taskListName: 'Currently Working',
      isDefault: 1,
      taskList: new Array<TaskList>(),
      updatedOn: new Date()
   },
   {
      tasklistId: uuid(),
      taskListName: 'Completed',
      isDefault: 1,
      taskList: new Array<TaskList>(),
      updatedOn: new Date()
  }
]

  constructor(private activeRoute: ActivatedRoute, private dialog: MatDialog, private router: Router) { 
    
      this.activeRoute.params.subscribe((data:any)=>{
        if(localStorage.getItem(data.id)){
          this.boardDetails = JSON.parse(localStorage.getItem(data.id));
        }else{
          this.router.navigate(['dashBoard']);
        }
      })

    }

  ngOnInit() {
    if(!this.boardDetails.isExist){
        this.boardDetails.isExist = true;
        this.boardDetails.boardList = this.defaultValues;
        this.setLocalStorage(this.boardDetails.boardId, this.boardDetails);
    }

    this.setConnetedToList();
  }

  //set connected list for Drag and Drop
  setConnetedToList(){
    if(this.boardDetails.boardList && this.boardDetails.boardList.length > 0){
      this.boardDetails.boardList.forEach((task:BoardList) => { 
          this.connectedTo.push(task.tasklistId);
      });
    }
  }

  //trigger function to set the value in local storage
  triggerSave(event){
    if(event.key === 'DELETE'){
      this.deleteTaskList(event.data);
    }
    
    this.setLocalStorage(this.boardDetails.boardId, this.boardDetails);
    this.setConnetedToList();
  }

  //Delete the entire task
  deleteTaskList(data:BoardList){
    this.boardDetails.boardList.forEach((eachBoard:BoardList, index)=>{
       if(eachBoard.tasklistId === data.tasklistId){
          this.boardDetails.boardList.splice(index,1);
       }
    });
  }

  //set the value to local storage
  setLocalStorage(key, value){
    localStorage.setItem(key,JSON.stringify(value));
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '250px',
      data:{
       from: 'CREATE_TASK' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.title){
        let tempObj:BoardList = new BoardList();
        tempObj.isDefault = 0;
        tempObj.taskList = new Array<TaskList>();
        tempObj.taskListName = result.title.trim();
        tempObj.tasklistId = uuid();
        tempObj.updatedOn = new Date();
        this.boardDetails.boardList.push(tempObj);
        this.connectedTo.push(tempObj.tasklistId);
        this.setLocalStorage(this.boardDetails.boardId, this.boardDetails);
      }
    });
  }

  //Clear all completed task
  clearCompleteTask(){
    let compleString = 'Completed';
    if(this.boardDetails.boardList){
        this.boardDetails.boardList.forEach((item)=>{
          if((item.taskListName.toUpperCase() === compleString.toUpperCase()) && item.isDefault){
            item.taskList = [];
          }
        })
    }
    this.setLocalStorage(this.boardDetails.boardId, this.boardDetails);
  }

  openConfirmation(deletekey): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data:{
        key : deletekey
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.clearCompleteTask()
      }
    });
  }

  //Function to show the completed button or nor
  checkCompletedbtn(){
    let result = false;
    let compleString = 'Completed';
    if(this.boardDetails.boardList && this.boardDetails.boardList.length > 0){
      this.boardDetails.boardList.forEach((list)=>{
        if((list.taskListName.toUpperCase() === compleString.toUpperCase()) && list.isDefault){
            result = (list.taskList.length > 0) ? true : false;
        }
      })
    }
    return result;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    this.setLocalStorage(this.boardDetails.boardId, this.boardDetails);
  }

}
