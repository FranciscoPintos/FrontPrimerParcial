import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-basic-dialog',
  templateUrl: './basic-dialog.component.html',
  styleUrls: ['./basic-dialog.component.css']
})
export class BasicDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BasicDialogComponent>) { }

  ngOnInit(): void {
  }

  close(isClosing: boolean) {
    this.dialogRef.close(isClosing);
  }

}
