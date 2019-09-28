import { BoardList } from './../model/boardList';
import { TaskList } from './../model/tasklist';
import { Board } from './../model/board';
import { Component, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Router, ActivatedRoute } from '@angular/router';

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
      taskListName: 'To Do Thing',
      isDefault: 1,
      taskList: new Array<TaskList>()
   },
   {
      tasklistId: uuid(),
      taskListName: 'Doing Thing',
      isDefault: 1,
      taskList: new Array<TaskList>()
   },
   {
      tasklistId: uuid(),
      taskListName: 'Done',
      isDefault: 1,
      taskList: new Array<TaskList>()
  }
]

  constructor(private activeRoute: ActivatedRoute) { 
    
      this.activeRoute.params.subscribe((data:any)=>{
        this.boardDetails = JSON.parse(localStorage.getItem(data.id));
      })

    }

  ngOnInit() {

    if(!this.boardDetails.isExist){
        this.boardDetails.isExist = false;
        this.boardDetails.boardList = this.defaultValues;
        this.setLocalStorage(this.boardDetails.boardId, this.boardDetails);
    }


    if(this.boardDetails.boardList && this.boardDetails.boardList.length > 0){
      this.boardDetails.boardList.forEach((task:BoardList) => { 
          this.connectedTo.push(task.tasklistId);
      });
    }
  }


  setLocalStorage(key, value){
    localStorage.setItem(key,JSON.stringify(value));
  }
}
