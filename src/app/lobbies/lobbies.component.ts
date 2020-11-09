import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { LobbiesService } from '../lobbies.service';
import { Lobby } from '../lobby';

@Component({
	selector: 'app-lobbies',
	templateUrl: './lobbies.component.html',
	styleUrls: ['./lobbies.component.scss']
})
export class LobbiesComponent implements OnInit {

	lobbies: Lobby[];

	constructor(private lobbiesService: LobbiesService) { }

	ngOnInit(): void {
		this.lobbiesService.getLobbies()
			.subscribe({
				next: (lobbies) => { this.lobbies = lobbies; }
			});
	}

}
