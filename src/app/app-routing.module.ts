import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbiesComponent } from './lobbies/lobbies.component';
import { RedirectorComponent } from './redirector/redirector.component';

const routes: Routes = [
	{ path: 'lobbies', component: LobbiesComponent },
	{ path: 'redirect/:id', component: RedirectorComponent },
	{ path: '', redirectTo: '/lobbies', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
