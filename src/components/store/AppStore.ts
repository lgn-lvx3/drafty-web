import PlayersData from "../../data/data.json"; // Adjust the path accordingly
import TeamsData from "../../data/teams.json";
import type { Player } from "../types/Player";
import type { Team } from "../types/Teams";
import type { FantasyPlayer } from "../types/FantasyPlayer";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { create, type StateCreator } from "zustand";

const players = Object.entries(PlayersData).map(([key, value]) => {
	return { ...(value as unknown as Player), id: key };
});

const active = players.filter((player) => player.active);
const playerActiveWithTeam = active.filter((player) => player.team !== null);

console.log("playerActiveWithTeam", playerActiveWithTeam);
// biome-ignore lint/complexity/noForEach: <explanation>
const teamValues = Object.values(TeamsData.teams) as Team[];
// const active = playerValues.filter((player) => player.active);
// const playerActiveWithTeam = active.filter((player) => player.team !== null);

interface State {
	fantasyPlayers: FantasyPlayer[];
	players: Player[];
	team: Team[];
	selectedFantasyPlayer: FantasyPlayer | undefined;
	selectedPlayer: Player | undefined;
	state: "Dynasty" | "Pool" | "Keeper" | "init";
	filter: Player[];
}

const initialState: State = {
	team: teamValues,
	players: playerActiveWithTeam,
	fantasyPlayers: [],
	selectedFantasyPlayer: undefined,
	selectedPlayer: undefined,
	state: "init",
	filter: [],
};

interface Actions {
	createFantasyPlayer: (name: string) => void;
	clearStore: () => void;
	reset: () => void;
	deleteFantasyPlayer: (id: number) => void;
	selectFantasyPlayer: (id: number) => void;
	selectPlayer: (id: string) => void;
	selectDynastyPlayer: (playerId: string) => void;
	removeDynastyPlayer: () => void;
	setAppState: (state: "Dynasty" | "Pool" | "Keeper" | "init") => void;
	isInAnyFantasyPlayerRoster: (player: Player) => InRoster | undefined;
	selectPoolPlayer: (playerId: string) => void;
	removePoolPlayer: (fantasyPlayerId: number, playerId: string) => void;
	randomizePoolPlayers: () => void;
	removeRandomizedPlayer: () => void;
}

export type InRoster = {
	fantasyPlayer: FantasyPlayer;
	player: Player;
	drafty_type: "Dynasty" | "Pool" | "Keeper";
};

const createStoreSlice: StateCreator<
	State & Actions,
	[["zustand/persist", unknown], ["zustand/devtools", never]],
	[],
	State & Actions
> = (set, get) => ({
	...initialState,
	createFantasyPlayer: (name: string) => {
		console.log("createFantasyPlayer");

		const newFantasyPlayer = {
			name,
			id: Math.floor(Math.random() * 1000000),
			dynastyPlayer: undefined,
			poolPlayers: [],
			selectedPoolPlayers: [],
			poolPlayerNotInRoster: undefined,
		} as FantasyPlayer;
		set(
			{ fantasyPlayers: [...get().fantasyPlayers, newFantasyPlayer] },
			false,
			"createFantasyPlayer",
		);
	},
	deleteFantasyPlayer: (id: number) => {
		set(
			{
				fantasyPlayers: get().fantasyPlayers.filter(
					(fantasyPlayer) => fantasyPlayer.id !== id,
				),
			},
			false,
			"deleteFantasyPlayer",
		);
	},
	clearStore: () => {
		localStorage.removeItem("persist");
		set({ ...initialState }, false, "clearStore");
	},
	reset: () => set({ ...initialState }, false, "reset"),
	selectFantasyPlayer: (id: number) => {
		set(
			{
				selectedFantasyPlayer: get().fantasyPlayers.find(
					(player) => player.id === id,
				),
				state: "init",
			},
			false,
			"selectFantasyPlayer",
		);
	},
	selectPlayer: (id: string) => {
		set(
			{
				selectedPlayer: get().players.find((player) => player.id === id),
			},
			false,
			"selectPlayer",
		);
	},
	selectDynastyPlayer: (playerId: string) => {
		const player = get().players.find((player) => player.id === playerId);
		const selectedFantasyPlayer = get().selectedFantasyPlayer;

		if (!selectedFantasyPlayer || !player) {
			return;
		}
		const fantasyPlayer = get().fantasyPlayers.find(
			(fantasyPlayer) => fantasyPlayer.id === selectedFantasyPlayer.id,
		);
		if (!fantasyPlayer) {
			return;
		}

		player.drafty_type = "dynasty";

		fantasyPlayer.dynastyPlayer = player;
		set(
			{
				fantasyPlayers: [...get().fantasyPlayers],
			},
			false,
			"selectDynastyPlayer",
		);
	},
	removeDynastyPlayer: () => {
		const selectedFantasyPlayer = get().selectedFantasyPlayer;
		const fantasyPlayers = get().fantasyPlayers.find(
			(fantasyPlayer) => fantasyPlayer.id === selectedFantasyPlayer?.id,
		);
		if (!fantasyPlayers) {
			return;
		}
		fantasyPlayers.dynastyPlayer = undefined;
		set(
			{
				fantasyPlayers: [...get().fantasyPlayers],
			},
			false,
			"removeDynastyPlayer",
		);
	},
	setAppState: (state: "Dynasty" | "Pool" | "Keeper" | "init") => {
		set({ state }, false, "setState");
	},

	isInAnyFantasyPlayerRoster: (player: Player) => {
		// console.log("isInAnyFantasyPlayerRoster", player);
		let inRoster: InRoster | undefined;

		const fantasyPlayers = get().fantasyPlayers;

		const dynastyPlayer = fantasyPlayers.find(
			(fantasyPlayer) => fantasyPlayer.dynastyPlayer?.id === player.id,
		);
		const poolPlayer = fantasyPlayers.find((fantasyPlayer) =>
			fantasyPlayer.poolPlayers?.find(
				(poolPlayer) => poolPlayer.id === player.id,
			),
		);
		const randomPlayer = fantasyPlayers.find(
			(fantasyPlayer) => fantasyPlayer.dynastyPlayer?.id === player.id,
		);
		const keeperPlayer = fantasyPlayers.find((fantasyPlayer) =>
			fantasyPlayer.selectedPoolPlayers?.find(
				(poolPlayer) => poolPlayer.id === player.id,
			),
		);

		if (dynastyPlayer) {
			inRoster = {
				fantasyPlayer: dynastyPlayer,
				player,
				drafty_type: "Dynasty",
			};
		} else if (poolPlayer) {
			inRoster = {
				fantasyPlayer: poolPlayer,
				player,
				drafty_type: "Pool",
			};
		} else if (keeperPlayer) {
			inRoster = {
				fantasyPlayer: keeperPlayer,
				player,
				drafty_type: "Keeper",
			};
		}
		return inRoster;
	},
	selectPoolPlayer: (playerId: string) => {
		console.log("selectPoolPlayer", playerId);
		const targetPlayer = get().selectedFantasyPlayer;
		if (!targetPlayer) {
			console.log("fantasyPlayer not found");
			return;
		}
		// no op if already 2 players in pool
		if (targetPlayer.poolPlayers.length >= 3) {
			console.log("poolPlayers length >= 3");
			return;
		}
		console.log(
			"targetPlayer",
			get().players.find((player) => player.id === playerId),
		);
		const player = get().players.find((player) => player.id === playerId);
		console.log("player", player);
		if (!player) {
			console.log("player not found");
			return;
		}
		// if exists return
		if (targetPlayer.poolPlayers.find((p) => p.id === player.id)) {
			console.log("player already in pool");
			return;
		}
		targetPlayer.poolPlayers.push(player);

		set(
			{
				fantasyPlayers: [...get().fantasyPlayers],
			},
			false,
			"selectPoolPlayer",
		);
	},
	removePoolPlayer: (fantasyPlayerId: number, playerId: string) => {
		const fantasyPlayer = get().fantasyPlayers.find(
			(fantasyPlayer) => fantasyPlayer.id === fantasyPlayerId,
		);
		if (!fantasyPlayer) {
			return;
		}

		if (fantasyPlayer.poolPlayers) {
			fantasyPlayer.poolPlayers = fantasyPlayer.poolPlayers.filter(
				(player) => player.id !== playerId,
			);
		}

		// remove the player from fantasyPlayer pool
		fantasyPlayer.poolPlayers = fantasyPlayer?.poolPlayers?.filter(
			(player) => player.id !== playerId,
		);

		set(
			{
				fantasyPlayers: [...get().fantasyPlayers],
			},
			false,
			"removePoolPlayer",
		);
	},
	randomizePoolPlayers: () => {
		const fantasyPlayer = get().fantasyPlayers.find(
			(fantasyPlayer) => fantasyPlayer.id === get().selectedFantasyPlayer?.id,
		);
		// const fantasyPlayer = get().selectedFantasyPlayer;
		if (!fantasyPlayer || fantasyPlayer.poolPlayers.length < 3) {
			return;
		}
		// shuffle sort
		fantasyPlayer.poolPlayers = fantasyPlayer.poolPlayers.sort(
			() => 0.5 - Math.random(),
		);
		// then select first 2
		const selectedPlayers = fantasyPlayer.poolPlayers.slice(0, 2);
		console.log("randomPlayers", selectedPlayers);

		// set drafty_type to Keeper
		// biome-ignore lint/complexity/noForEach: <explanation>
		selectedPlayers.forEach((player) => {
			player.drafty_type = "Keeper";
		});
		fantasyPlayer.selectedPoolPlayers = selectedPlayers;
		fantasyPlayer.poolPlayerNotInRoster = fantasyPlayer.poolPlayers.filter(
			(player) => !selectedPlayers.includes(player),
		)[0];
		fantasyPlayer.poolPlayers = [];
		set(
			{
				fantasyPlayers: [...get().fantasyPlayers],
			},
			false,
			"randomizePoolPlayers",
		);
	},
	removeRandomizedPlayer: () => {
		const fantasyPlayer = get().fantasyPlayers.find(
			(fantasyPlayer) => fantasyPlayer.id === get().selectedFantasyPlayer?.id,
		);
		if (!fantasyPlayer) {
			return;
		}
		fantasyPlayer.selectedPoolPlayers = [];
		set(
			{
				fantasyPlayers: [...get().fantasyPlayers],
			},
			false,
			"removeRandomizedPlayer",
		);
	},
});

export type AppSlice = State & Actions;

export const useAppStore = create<AppSlice>()(
	persist(
		devtools(
			(...a) => {
				return {
					...createStoreSlice(...a),
				};
			},
			{ name: "devtools" },
		),
		{
			name: "persist",
			storage: createJSONStorage(() => localStorage),
			// partialize: (state) => ({
			//     // ommit all from UserDropSlice
			//     ...state,
			// }),
		},
	),
);
