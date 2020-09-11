import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BacklogComponent } from './pages/backlog/backlog.component';
import { MaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardComponent } from './pages/board/board.component';
import { StoryEditorDialogComponent } from './components/dialogs/story-editor-dialog/story-editor-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { StoryItemComponent } from './components/story-item/story-item.component';
import { StoryIdPipe } from './pipes/story-id/story-id.pipe';
import { StoryListComponent } from './components/story-list/story-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {StoryEffects} from './store/effects/story.effects';
import {applicationReducers} from './store/reducers';
import {applicationEffects} from './store/effects';

@NgModule({
  declarations: [
    AppComponent,
    BacklogComponent,
    BoardComponent,
    StoryEditorDialogComponent,
    NavBarComponent,
    StoryItemComponent,
    StoryIdPipe,
    StoryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(applicationReducers),
    EffectsModule.forRoot(applicationEffects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
