import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {StoryItem, Task, typeKeys} from '../../../models/types';
import {select, Store} from '@ngrx/store';
import {StorySelectors} from '../../../store/selectors';
import {easeIn} from '../../../styles/animations';
import {DEFAULTS} from '../../../config/constants.config';

@Component({
  selector: 'app-create-story-dialog',
  templateUrl: './story-editor-dialog.component.html',
  styleUrls: ['./story-editor-dialog.component.scss'],
  animations: [easeIn]
})
export class StoryEditorDialogComponent {

  public readonly appearance = 'outline';
  public readonly typeKeys = typeKeys;

  public formGroup: FormGroup;

  public readonly allStoryIds$ = this.store.pipe(
    select(StorySelectors.selectStoryIds)
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StoryItem,
    private readonly dialogRef: MatDialogRef<StoryEditorDialogComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly store: Store
  ) {
    this.formGroup = formBuilder.group({
      identifier: formBuilder.group({
        userId: this.data?.identifier.userId,
        referenceId: this.data?.identifier.referenceId,
      }),
      parent: [this.data?.parent || DEFAULTS.parent, Validators.required],
      children: [this.data?.children, []],
      title: [this.data?.title, [Validators.required, Validators.minLength(1), Validators.maxLength(80)]],
      description: [this.data?.description, Validators.maxLength(255)],
      tasks: formBuilder.array([]),
      priority: [this.data?.priority || DEFAULTS.priority, Validators.required],
      size: [this.data?.size || DEFAULTS.size, Validators.required],
      status: [this.data?.status || DEFAULTS.status, Validators.required]
    });

    this.data?.tasks?.forEach(task => this.addTask(task));
  }

  addTask(task: Task = null) {
    this.tasksForm.push(this.taskToFormControl(task));
  }

  removeTask(taskIndex: number) {
    this.tasksForm.removeAt(taskIndex);
  }

  taskToFormControl(task: Task = null): FormGroup {
    return this.formBuilder.group({
      label: [task?.label, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      done: task?.done ? true : false
    });
  }

  get tasksForm(): FormArray {
    return this.formGroup.get('tasks') as FormArray;
  }

}

// [Validators.required, Validators.minLength(1), Validators.maxLength(255)]

const validInteger: ValidatorFn = (control: AbstractControl) => {
  return !Number.isInteger(Number(control.value))
    ? { invalidInteger: control.value } as ValidationErrors
    : null;
};

/*
  id: number;
  parent: number;
  children: number[];
  title: string;
  description: string;
  tasks: Task[];
  priority: Priority;
  size: Size;
  status: Status;
 */
