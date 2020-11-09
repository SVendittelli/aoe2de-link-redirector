import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

	transform(secondsSinceEpoch: number): string {
		if (secondsSinceEpoch) {
			const millisecondsSinceEpoch = secondsSinceEpoch * 1000;
			const differenceInSeconds = Math.floor((+new Date() - +new Date(millisecondsSinceEpoch)) / 1000);
			// less than 30 seconds ago will show as 'Just now'
			if (differenceInSeconds < 30) {
				return 'Just now';
			}

			// All values are in seconds
			const timeIntervals = {
				'year': 31536000,
				'month': 2592000,
				'week': 604800,
				'day': 86400,
				'hour': 3600,
				'minute': 60,
				'second': 1,
			};
			let counter: number;
			for (const i in timeIntervals) {
				counter = Math.floor(differenceInSeconds / timeIntervals[i]);
				if (counter > 0) {
					if (counter === 1) {
						// singular (1 day ago)
						return counter + ' ' + i + ' ago';
					} else {
						// plural (2 days ago)
						return counter + ' ' + i + 's ago';
					}
				}

			}

		}
		return `${secondsSinceEpoch}`;
	}

}
