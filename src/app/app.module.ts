import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RedirectorComponent } from './redirector/redirector.component';
import { LobbiesComponent } from './lobbies/lobbies.component';
import { LobbyComponent } from './lobby/lobby.component';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
	declarations: [
		AppComponent,
		RedirectorComponent,
		LobbiesComponent,
		LobbyComponent,
		TimeAgoPipe,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
