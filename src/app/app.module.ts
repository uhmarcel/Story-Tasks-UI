import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule, Title} from '@angular/platform-browser';
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
import { ColorStylePipe } from './pipes/color-style/color-style.pipe';
import {AuthComponent} from './components/auth/auth.component';
import {storageMetaReducer} from './store/reducers/storage.metareducer';
import { PageNavigationComponent } from './components/page-navigation/page-navigation.component';
import { NormalizeCasePipe } from './pipes/normalize-case/normalize-case.pipe';
import {HammerConfig} from './config/hammerjs.config';

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
    ColorStylePipe,
    AuthComponent,
    PageNavigationComponent,
    NormalizeCasePipe,
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
    EffectsModule.forRoot(applicationEffects),
    StoreModule.forRoot(applicationReducers, {
      metaReducers: [storageMetaReducer]
    })
  ],
  providers: [
    Title,
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
