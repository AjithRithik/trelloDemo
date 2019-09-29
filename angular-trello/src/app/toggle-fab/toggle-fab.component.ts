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

  ngOnInit() {
  }

  fabButtons = [
        {
          icon: 'add',
          value : 'Add',
          key: 'ADD'
        },
        {
          icon: 'delete',
          value : 'Delete',
          key: 'DELETE'
        }
      ];
    
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

}
