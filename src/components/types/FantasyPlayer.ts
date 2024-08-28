import type { Player } from "./Player";

export type FantasyPlayer = {
	id: number;
	name: string;
	dynastyPlayer: Player | undefined;
	poolPlayers: Player[];
	selectedPoolPlayers: Player[];
	poolPlayerNotInRoster: Player | undefined;
};
