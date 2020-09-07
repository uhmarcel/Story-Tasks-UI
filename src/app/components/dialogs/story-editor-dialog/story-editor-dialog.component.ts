import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-story-dialog',
  templateUrl: './story-editor-dialog.component.html',
  styleUrls: ['./story-editor-dialog.component.scss']
})
export class StoryEditorDialogComponent {

  public readonly priorities = ['BLOCKER', 'CRITICAL', 'VERY_HIGH', 'HIGH', 'MEDIUM', 'LOW', 'VERY_LOW', 'OPTIONAL'];
  public readonly sizes = ['XXL', 'XL', 'L', 'M', 'S'];
  public readonly statuses = ['ANALYSIS', 'TODO', 'IN_PROGRESS', 'DONE'];

  public readonly appearance = 'outline';

  public storyForm: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<StoryEditorDialogComponent>,
    private readonly formBuilder: FormBuilder
  ) {
    this.storyForm = formBuilder.group({
      id : [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(9999)])],
      name : [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(80)])],
      description : [null, Validators.maxLength(255)],
      priority : [null, Validators.required],
      size: [null, Validators.required],
      status: [null, Validators.required]
    });
  }
}

