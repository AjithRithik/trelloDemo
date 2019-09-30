import { BoardList } from './../model/boardList';
import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { fabAnimations } from '../animation/fabAnimate';

@Component({
  selector: 'app-toggle-fab',
  templateUrl: './toggle-fab.component.html',
  styleUrls: ['./toggle-fab.component.scss'],
  animations: fabAnimations
})
export class ToggleFabComponent implements OnInit {

  constructor() { }

  @Output() triggerClick = new EventEmitter<any>();

  @Input('data') data:BoardList;

  fabButtons:any = [];

  defaultBtn = [
        {
          icon: 'add',
          value : 'Add',
          key: 'ADD'
        },
        {
          icon: 'clear',
          value : 'Clear',
          key: 'CLEAR'
        }
      ];

  newBtn = [
        {
          icon: 'add',
          value : 'Add',
          key: 'ADD'
        },
        {
          icon: 'delete',
          value : 'Delete',
          key: 'DELETE'
        },
        {
          icon: 'clear',
          value : 'Clear',
          key: 'CLEAR'
        }
      ];
  ngOnInit() {
      if(this.data.isDefault){
         this.fabButtons = this.defaultBtn; 
      }else{
        this.fabButtons = this.newBtn;
      }
  }
    
  buttons:any = [];
  fabTogglerState = 'inactive';
  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  } 
    
  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }
    
  onToggleFab() {
    this.buttons.length  ? this.hideItems() : this.showItems();
  }

  triggerParent(btn){
    this.triggerClick.emit({'key':btn.key});
    this.hideItems()
  }

}
