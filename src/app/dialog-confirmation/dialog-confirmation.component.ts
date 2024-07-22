import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriberFormComponent } from '../subscriber-form/subscriber-form.component';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css']
})
export class DialogConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { subscriber_id: string }
  ) {}

  onLandingClick(): void {
    this.dialogRef.close('landing');
  }

  onSubscriberClick(): void {
    this.dialogRef.close('subscriber');
  }
}
