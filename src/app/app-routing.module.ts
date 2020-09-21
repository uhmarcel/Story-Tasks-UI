import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BacklogComponent } from './pages/backlog/backlog.component';
import { BoardComponent } from './pages/board/board.component';
import { LoginComponent } from './pages/login/login.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {OKTA_CONFIG, OktaAuthGuard, OktaAuthModule, OktaCallbackComponent} from '@okta/okta-angular';
import {oicdConfig} from './config/oicd.config';
import {AuthInterceptor} from './services/auth/auth.interceptor';
import {AuthGuard} from './services/auth/auth.guard';

// TODO: Add lazy loading
// TODO: Use sign in widget & clean routes

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: '', redirectTo: 'board', pathMatch: 'full', canActivate: [ AuthGuard ]},
  { path: 'backlog', component: BacklogComponent, canActivate: [ AuthGuard] },
  { path: 'board', component: BoardComponent, canActivate: [ AuthGuard] },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    OktaAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oicdConfig },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
