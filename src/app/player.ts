export interface Player {
	profile_id: number;
	steam_id: string;
	name: string;
	clan: string;
	country: string;
	slot: number;
	slot_type: number;
	rating: number;
	rating_change: number;
	games: number;
	wins: number;
	streak: number;
	drops: number;
	color: string;
	team: number;
	civ: string;
	won: boolean;
}
