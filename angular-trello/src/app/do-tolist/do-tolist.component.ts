import { BoardList } from './../model/boardList';
import { TaskList } from './../model/tasklist';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-do-tolist',
  templateUrl: './do-tolist.component.html',
  styleUrls: ['./do-tolist.component.scss']
})
export class DoTolistComponent implements OnInit {

  constructor() { }

  value="";

  showAddSection: boolean = false;

  @Input('items') items: BoardList;
  
  @Input('connected') connected: any;

  ngOnInit() {
   
  }

  addTask(name: string){
    let temp:TaskList = new TaskList();
    temp.updatedOn = new Date();
    temp.taskId = uuid();
    temp.taskName = name;
    this.items.taskList.push(temp);
    this.value="";
    this.showAddSection = false;
  }

  @HostListener('resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
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
  }

}
