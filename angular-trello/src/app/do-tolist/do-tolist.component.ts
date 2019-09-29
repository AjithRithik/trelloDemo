import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BoardList } from './../model/boardList';
import { TaskList } from './../model/tasklist';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-do-tolist',
  templateUrl: './do-tolist.component.html',
  styleUrls: ['./do-tolist.component.scss']
})
export class DoTolistComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  taskValue;
  _resultValue;

  showAddSection: boolean = false;

  @ViewChild('scrollElement', {static: false}) el : ElementRef;

  @Input()
  get items(): BoardList { return this._resultValue};
  set items(value: BoardList){
    this._resultValue = value;
  }
  
  @Input('connected') connected: Array<string>;

  @Output() modelChange = new EventEmitter<any>();

  ngOnInit() {
    this.setInitialFlagAsFalse();
  }

  scrollToBottom(){
    setTimeout(()=>{
      this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
    },50);
  }

  setInitialFlagAsFalse(){
    this.items.isUpdate = false;
    if(this.items.taskList.length && this.items.taskList.length > 0){
      Array.from(this.items.taskList,(item:TaskList,index)=>{
        item.showEdit = false;
        item.showUpdate = false;
      });
    }
  }

  addTask(name: string){
    let temp:TaskList = new TaskList();
    temp.updatedOn = new Date();
    temp.taskId = uuid();
    temp.taskName = name; 
    this.items.taskList.push(temp);
    this.taskValue='';
    this.items.updatedOn = new Date();
    this.modelChange.emit({data:this.items, key:'ADD'});
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
    this.modelChange.emit(this.items);
  }

  onButtonClick(event){
    if(event.key === 'ADD'){
      this.showAddSection = true;
      this.scrollToBottom();
    }else if(event.key === 'DELETE'){
      this.openConfirmation();
    }
  }

  editTask(item){
    if(item.taskName && item.taskName.trim() !== ''){
      this.modelChange.emit({data:this.items, key:'UPDATE'});
    }else{
      item.taskName = item.copyValue;
    }
    item.showUpdate = false;
  }

  editTaskName(item){
    if(item.taskListName && item.taskListName.trim() !== ''){
      this.modelChange.emit({data:this.items, key:'UPDATE'});
    }else{
      item.taskListName = item.copyValue;
    }
    item.isUpdate = false;
  }

  deleteItem(index){
    this.openConfirmation(true,index);
  }

  openConfirmation(isFromSingleTask?,index?): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(isFromSingleTask){
          this.items.taskList.splice(index,1);
          this.items.updatedOn = new Date(); 
          this.modelChange.emit({data:this.items, key:'REMOVE'}); 
        }else{
          this.modelChange.emit({data:this.items, key:'DELETE'});
        }
      }
    });
  }

  setInputFocus(){
    setTimeout(function(){
      let el = document.querySelectorAll('input');
      el[0].focus();
    },200);
  }
}
