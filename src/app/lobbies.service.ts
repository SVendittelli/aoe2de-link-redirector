import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Lobby } from './lobby';

@Injectable({
  providedIn: 'root'
})
export class LobbiesService {

	url = 'https://aoe2.net/api/lobbies?game=aoe2de';

	constructor(private http: HttpClient) { }

	getLobbies(): Observable<Lobby[]> {
		return this.http.get<Lobby[]>(this.url);
	}

	getLobby(id: string): Observable<Lobby> {
		return this.getLobbies()
			.pipe(
				switchMap(lobbies => from(lobbies)),
				filter(lobby => lobby.match_id === id)
			)
	}
}
