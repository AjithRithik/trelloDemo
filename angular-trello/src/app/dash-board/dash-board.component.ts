import { Board } from './../model/board';
import { CreateDialogComponent } from './../create-dialog/create-dialog.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  //Variable Declaration
  board:Board = new Board();
  createdList:Array<Board> = new Array<Board>();
  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    for(let storage = 0 ; storage < localStorage.length; storage++){
      this.createdList.push(JSON.parse(localStorage.getItem(localStorage.key(storage))));
    }
  }

  openBoard(url,board){
    this.router.navigate([url,board.boardId]);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '250px',
      data:{
       from: 'CREATE_BOARD' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.title){
        this.board.boardId = uuid();
        this.board.boardName = result.title.trim();
        this.board.isExist = false;
        localStorage.setItem(this.board.boardId,JSON.stringify(this.board));
        this.router.navigate(['taskBoard',this.board.boardId])
      }
    });
  }

}
