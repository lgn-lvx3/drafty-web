import type React from "react";
import type { Player } from "../types/Player";
import type { Team } from "../types/Teams";
import TeamsData from "../../data/teams.json";
import { Card } from "react-daisyui";
import { useAppStore } from "../store/AppStore";

interface PlayerCardProps {
	player: Player | undefined;
	type: "Dynasty" | "Pool";
	selected?: boolean;
}

const teams = Object.values(TeamsData.teams) as Team[];

export const RosterPlayerCard: React.FC<PlayerCardProps> = ({
	player,
	type,
	selected,
}) => {
	if (!player) return null;

	const team = teams.find((team) => team.abbrev === player.team) || null;
	const { isInAnyFantasyPlayerRoster } = useAppStore();
	const value = isInAnyFantasyPlayerRoster(player);

	return (
		<Card
			className={`flex bg-neutral my-3 min-w-72 ${selected ? "shadow-lg shadow-violet-700" : ""}`}
		>
			<Card.Body className="p-5">
				<div className="flex flex-row justify-start">
					<div className="absolute bottom-3 right-3">
						<img className="flex w-16 object-contain" src={team?.imgURL} />
					</div>
					<div className="flex flex-col">
						<div className="flex-1">
							<h1 className="text-3xl text-ellipsis">{player.full_name}</h1>
							<div className="badge badge-primary badge-outline">
								{value
									? `${value.fantasyPlayer.name} - ${value.drafty_type}`
									: "None"}
							</div>
						</div>
						<div className="flex flex-col items-start">
							<p>
								{team?.region} {team?.name ? team.name : "None"}
							</p>
							<div className="flex flex-row">
								<p>Positions</p>
								<p className="ml-2">
									{player.fantasy_positions
										? player.fantasy_positions.join(", ")
										: "None"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
};

export default RosterPlayerCard;
