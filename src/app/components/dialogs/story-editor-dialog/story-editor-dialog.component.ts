import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {typeKeys} from '../../../models/types';

@Component({
  selector: 'app-create-story-dialog',
  templateUrl: './story-editor-dialog.component.html',
  styleUrls: ['./story-editor-dialog.component.scss']
})
export class StoryEditorDialogComponent {

  public readonly appearance = 'outline';
  public readonly typeKeys = typeKeys;

  public storyForm: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<StoryEditorDialogComponent>,
    private readonly formBuilder: FormBuilder
  ) {

    const validInteger: ValidatorFn = (control: AbstractControl) =>
      !Number.isInteger(Number(control.value))
        ? { invalidInteger: control.value } as ValidationErrors
        : null;

    this.storyForm = formBuilder.group({
      id: [null, [
        Validators.required,
        Validators.min(0),
        Validators.max(9999),
        validInteger
      ]],
      name: [null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(80)
      ]],
      description: [null,
        Validators.maxLength(255)
      ],
      priority: [null,
        Validators.required
      ],
      size: [null,
        Validators.required
      ],
      status: [null,
        Validators.required
      ]
    });
  }
}

