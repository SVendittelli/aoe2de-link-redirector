import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { filter, map, switchMap, takeWhile, tap } from 'rxjs/operators';

@Component({
	selector: 'app-redirector',
	templateUrl: './redirector.component.html',
	styleUrls: ['./redirector.component.scss']
})
export class RedirectorComponent implements OnInit {

	autoRedirect = false;
	cancelled = false;
	clicked = false;
	maxWait = 5;
	secondsRemaining = this.maxWait;
	urlString: string;

	get url(): SafeUrl {
		return this.sanitizer.bypassSecurityTrustUrl(this.urlString);
	}

	get timerRunning(): boolean {
		return !this.clicked && !this.cancelled && this.secondsRemaining > 0;
	}

	constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.route.queryParams
			.pipe(
				tap({ next: params => {
					this.urlString = `aoe2de://${params.id}`;
					this.autoRedirect = (params.auto) == 'true';
				}}),
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
	}

	onClickOpen() {
		this.clicked = true;
	}

	onClickCancel() {
		this.cancelled = true;
	}

}
