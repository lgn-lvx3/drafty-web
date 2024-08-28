import Head from "~/components/shared/Head";

import PlayersData from "../../data/data.json"; // Adjust the path accordingly
import type { Player } from "../types/Player";
import { PlayerCard } from "../shared/PlayerCard";
import { Button, Card, Input } from "react-daisyui";
import { useEffect, useState } from "react";
import FantasyPlayerCard from "../shared/FantasyPlayerCard";
import AddFantasyTeamCard from "../shared/AddFantasyTeamCard";
import { useAppStore } from "../store/AppStore";

export default function HomeScreen() {
	const { fantasyPlayers, clearStore, players } = useAppStore();

	const [search, setSearch] = useState("");

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const filteredPlayers = players.filter((player) =>
		player.search_full_name
			?.toLowerCase()
			.startsWith(search.replace(/\s/g, "").toLowerCase()),
	);

	useEffect(() => {
		console.log("fantasyPlayers", fantasyPlayers);
	}, [fantasyPlayers]);

	return (
		<>
			<Head title="Home" />

			<div className="w-screen h-screen bg-slate-300">
				<div className="grid grid-cols-3 h-screen">
					{/* left grid */}
					<div className="flex p-3 flex-1 w-full flex-col overflow-y-auto col-span-2">
						{fantasyPlayers.map((fantasyPlayer) => (
							<FantasyPlayerCard
								fantasyPlayer={fantasyPlayer}
								key={fantasyPlayer.id}
							/>
						))}
						<AddFantasyTeamCard />
						<Button
							color="warning"
							onClick={() => clearStore()}
							className="absolute bottom-0 right-0"
						>
							Clear Store
						</Button>
					</div>
					{/* player search list */}
					<div className="flex flex-1 w-full justify-center overflow-y-auto">
						<div className="fixed top-5 z-10">
							<Input
								placeholder="Search"
								onChange={handleSearch}
								size="lg"
								className="w-96 mx-auto"
							/>
							<div className="text-sm text-gray-500 text-right">
								{filteredPlayers.length} results
							</div>
						</div>

						<div className="mt-24">
							{filteredPlayers.map((player) => (
								<div className="flex justify-center" key={player.id}>
									<PlayerCard player={player} key={player.id} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
