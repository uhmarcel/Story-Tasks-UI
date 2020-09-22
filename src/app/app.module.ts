import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BacklogComponent } from './pages/backlog/backlog.component';
import { MaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardComponent } from './pages/board/board.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { StoryItemComponent } from './components/story-item/story-item.component';
import { StoryIdPipe } from './pipes/story-id/story-id.pipe';
import { StoryListComponent } from './components/story-list/story-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {applicationReducers} from './store/reducers';
import {applicationEffects} from './store/effects';
import {ReactiveComponentModule} from '@ngrx/component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {LoginComponent} from './pages/login/login.component';
import {StoryEditorComponent} from './components/dialogs/story-editor/story-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    BacklogComponent,
    BoardComponent,
    StoryEditorComponent,
    NavBarComponent,
    StoryItemComponent,
    StoryIdPipe,
    StoryListComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    StoreModule.forRoot(applicationReducers),
    EffectsModule.forRoot(applicationEffects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
