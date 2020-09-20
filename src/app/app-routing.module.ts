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

// TODO: Add lazy loading
// TODO: Use sign in widget & clean routes

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full', canActivate: [ OktaAuthGuard]},
  { path: 'backlog', component: BacklogComponent, canActivate: [ OktaAuthGuard] },
  { path: 'board', component: BoardComponent, canActivate: [ OktaAuthGuard] },
  { path: 'auth', component: LoginComponent },
  { path: 'auth/login', component: OktaCallbackComponent },
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
