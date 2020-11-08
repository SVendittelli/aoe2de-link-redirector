import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedirectorComponent } from './redirector/redirector.component';

const routes: Routes = [
	{ path: 'redirect', component: RedirectorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
