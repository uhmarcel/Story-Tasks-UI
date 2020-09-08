import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BacklogComponent} from './pages/backlog/backlog.component';

// TODO: Add lazy loading

const routes: Routes = [
  { path: '', redirectTo: 'backlog', pathMatch: 'full' },
  { path: 'backlog', component: BacklogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
