import type React from "react";
import type { Player } from "../types/Player";
import type { Team } from "../types/Teams";
import TeamsData from "../../data/teams.json";
import { Card, Button } from "react-daisyui";
import { useAppStore } from "../store/AppStore";

interface PlayerCardProps {
	player: Player | undefined;
}

const teams = Object.values(TeamsData.teams) as Team[];
export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
	if (!player) return null;

	const team = teams.find((team) => team.abbrev === player.team) || null;

	const {
		selectPlayer,
		selectedPlayer,
		state,
		selectDynastyPlayer,
		isInAnyFantasyPlayerRoster,
		selectPoolPlayer,
		selectedFantasyPlayer,
	} = useAppStore();

	const isInRoster = isInAnyFantasyPlayerRoster(player);
	// console.log("isInAnyFantasyPlayerRoster", isInRoster);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div onClick={() => selectPlayer(player.id)}>
			<Card
				className={`flex w-96 bg-base-100 shadow-xl my-4 cursor-pointer ${
					selectedPlayer?.id === player.id ? "border-2 border-primary" : ""
				}`}
			>
				<Card.Body className={`p-4 ${isInRoster ? "opacity-60" : ""}`}>
					<div className="flex flex-row justify-start min-w-72">
						<div className="flex justify-center ">
							<img className="flex w-16 object-contain" src={team?.imgURL} />
						</div>
						<div className="flex flex-col ml-5">
							<div className="flex-1">
								<h1 className="text-3xl text-ellipsis">{player.full_name}</h1>
								{isInRoster && (
									<div className="badge badge-primary badge-outline">
										{`${isInRoster.fantasyPlayer.name} - ${isInRoster.drafty_type}`}
									</div>
								)}
							</div>
							<div className="flex flex-col items-start">
								<p>
									{team?.region} {team?.name ? team.name : "None"}
								</p>
								<div className="flex flex-row">
									<p>Fantasy Positions</p>
									<p className="ml-2">
										{player.fantasy_positions
											? player.fantasy_positions.join(", ")
											: "None"}
									</p>
								</div>
							</div>
						</div>
					</div>
					{selectedPlayer?.id === player.id && (
						<Card.Actions className="flex justify-end">
							<Button
								color="primary"
								onClick={(e) => {
									e.stopPropagation();
									if (state === "Dynasty") {
										selectDynastyPlayer(player.id);
									} else if (state === "Pool") {
										selectPoolPlayer(player.id);
									}
								}}
								disabled={isInRoster ? true : false || state === "init"}
							>
								Select {state} Player
							</Button>
						</Card.Actions>
					)}
				</Card.Body>
			</Card>
		</div>
	);
};

export default PlayerCard;
