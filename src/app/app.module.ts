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

@NgModule({
  declarations: [
    AppComponent,
    BacklogComponent,
    BoardComponent,
    StoryEditorDialogComponent,
    NavBarComponent,
    StoryItemComponent,
    StoryIdPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
