import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent {
  public message: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { message: string }) { 
      this.message = data.message;
    }
}