import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { interval, Observable } from 'rxjs';
import { filter, map, switchMap, takeWhile, tap } from 'rxjs/operators';

import { LobbiesService } from '../lobbies.service';
import { Lobby } from '../lobby';

@Component({
	selector: 'app-redirector',
	templateUrl: './redirector.component.html',
	styleUrls: ['./redirector.component.scss']
})
export class RedirectorComponent implements OnInit {

	autoRedirect = false;
	cancelled = false;
	clicked = false;
	lobby: Lobby;
	maxWait = 5;
	secondsRemaining = this.maxWait;
	urlString: string;

	get url(): SafeUrl {
		return this.sanitizer.bypassSecurityTrustUrl(this.urlString);
	}

	get timerRunning(): boolean {
		return !this.clicked && !this.cancelled && this.secondsRemaining > 0;
	}

	constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private lobbiesService: LobbiesService) { }

	ngOnInit(): void {
		this.route.params
			.pipe(
				map(params => params.id),
				filter(id => !isNaN(id)),
				tap({ next: id => { this.urlString = `aoe2de://${Number(id)}`; }}),
				switchMap(id => this.getLobby(id)),
				filter(_ => this.autoRedirect),
				switchMap(_ => interval(1000).pipe(map(seconds => seconds + 1))),
				takeWhile(_ => this.timerRunning),
				tap(secondsElapsed => this.secondsRemaining = this.maxWait - secondsElapsed)
			)
			.subscribe({
				complete: () => {
					if (this.autoRedirect && !this.cancelled) window.location.href = this.urlString;
				}
			});

			this.route.queryParams.subscribe(params => this.autoRedirect = (params.auto) == 'true');
	}

	onClickOpen() {
		this.clicked = true;
	}

	onClickCancel() {
		this.cancelled = true;
	}

	private getLobby(id: string): Observable<string> {
		return this.lobbiesService.getLobby(id)
			.pipe(
				tap({
					next: lobby => { this.lobby = lobby }
				}),
				map(_ => id)
			);
	}

}
