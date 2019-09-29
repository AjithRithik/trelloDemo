import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {

  title:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private dialogRef: MatDialogRef<CreateDialogComponent>) { }

  ngOnInit() {
  }

}
