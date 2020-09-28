import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Color, Priority, Size, Status, StoryItem, Task, typeKeys} from '../../../models';
import {select, Store} from '@ngrx/store';
import {StorySelectors} from '../../../store/selectors';
import {easeIn} from '../../../styles/animations';
import {DEFAULTS} from '../../../config/constants.config';
import {StoryActions} from '../../../store/actions';
import {getStoryId} from '../../../store/reducers/story.reducer';
import {map, tap} from 'rxjs/operators';

export enum EditorType {
  CREATE = 'Create',
  EDIT = 'Update',
}

@Component({
  selector: 'app-story-editor',
  templateUrl: './story-editor.component.html',
  styleUrls: ['./story-editor.component.scss'],
  animations: [easeIn]
})
export class StoryEditorComponent {

  public readonly colors = Color;
  public readonly priorities = Object.values(Priority);
  public readonly statuses = Object.values(Status);
  public readonly sizes = Object.values(Size);

  public readonly appearance = 'outline';
  public readonly typeKeys = typeKeys;
  public formGroup: FormGroup;

  public readonly allStoryIds$ = this.store.pipe(
    select(StorySelectors.selectStoryIds),
    map((storyIds: number[]) => [...storyIds].sort((a, b) => a - b)),
  );
  public readonly editorType: EditorType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StoryItem,
    private readonly dialogRef: MatDialogRef<StoryEditorComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly store: Store
  ) {
    this.editorType = this.data ? EditorType.EDIT : EditorType.CREATE;
    this.buildFormGroup(this.data);
  }

  submitStory() {
    const storyItem = this.formGroup.value as StoryItem;

    switch (this.editorType) {
      case EditorType.CREATE:
        this.store.dispatch(StoryActions.createStoryItem({ storyItem }));
        break;
      case EditorType.EDIT:
        this.store.dispatch(StoryActions.updateStoryItem({ storyItem }));
        break;
    }
  }

  deleteStory() {
    const storyID = getStoryId(this.data);
    this.store.dispatch(
      StoryActions.deleteStoryItem({ storyID })
    );
  }

  addTask(task: Task = null) {
    this.tasksForm.push(this.taskToFormControl(task));
  }

  removeTask(taskIndex: number) {
    this.tasksForm.removeAt(taskIndex);
  }

  get tasksForm(): FormArray {
    return this.formGroup.get('tasks') as FormArray;
  }

  taskToFormControl(task: Task = null): FormGroup {
    return this.formBuilder.group({
      label: [task?.label, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      done: task?.done ? true : false
    });
  }

  private buildFormGroup(story: StoryItem) {
    this.formGroup = this.formBuilder.group({
      identifier: this.formBuilder.group({
        userId: story?.identifier.userId,
        referenceId: story?.identifier.referenceId,
      }),
      parent: [story?.parent || DEFAULTS.parent, Validators.required],
      children: [story?.children, []],
      title: [story?.title, [Validators.required, Validators.minLength(1), Validators.maxLength(80)]],
      description: [story?.description, Validators.maxLength(2048)],
      tasks: this.formBuilder.array([]),
      priority: [story?.priority || DEFAULTS.priority, Validators.required],
      size: [story?.size || DEFAULTS.size, Validators.required],
      status: [story?.status || DEFAULTS.status, Validators.required],
      color: story?.color
    });

    story?.tasks?.forEach(task => this.addTask(task));
  }

}


