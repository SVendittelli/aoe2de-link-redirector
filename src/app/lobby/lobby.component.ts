import { Component, Input, OnInit } from '@angular/core';
import { Lobby } from '../lobby';

@Component({
	selector: 'app-lobby',
	templateUrl: './lobby.component.html',
	styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

	@Input()
	lobby: Lobby;

	constructor() { }

	ngOnInit(): void {
		console.log('lobby', this.lobby)
	}

}
