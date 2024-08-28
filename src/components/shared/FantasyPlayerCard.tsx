import type React from "react";
import type { Player } from "../types/Player";
import type { Team } from "../types/Teams";
import { Card, Avatar, Button, Badge, Indicator } from "react-daisyui";
import type { FantasyPlayer } from "../types/FantasyPlayer";
import PlayerCard from "./PlayerCard";
import { useAppStore } from "../store/AppStore";
import RosterPlayerCard from "./RosterPlayerCard";

interface PlayerCardProps {
	fantasyPlayer: FantasyPlayer;
}

export const FantasyPlayerCard: React.FC<PlayerCardProps> = ({
	fantasyPlayer,
}) => {
	const {
		deleteFantasyPlayer,
		selectFantasyPlayer,
		selectedFantasyPlayer,
		removeDynastyPlayer,
		setAppState,
		removePoolPlayer,
		randomizePoolPlayers,
		removeRandomizedPlayer,
	} = useAppStore();

	return (
		<div className="">
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className="collapse collapse-arrow bg-base-200 my-2"
				onClick={() => selectFantasyPlayer(fantasyPlayer.id)}
			>
				<input type="radio" name="my-accordion-2" defaultChecked />
				<div className="collapse-title flex flex-col mb-3">
					{/* Header */}
					<h1 className="text-3xl text-ellipsis">{fantasyPlayer.name}</h1>
					<span className="text-xs">{fantasyPlayer.id}</span>
				</div>
				<div className="collapse-content">
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div>
						<Card
							className={`flex flex-1 bg-base-100 shadow-xl pointer-cursor ${
								fantasyPlayer.id === selectedFantasyPlayer?.id
									? "border-2 border-primary"
									: ""
							}`}
						>
							<Card.Body>
								<div className="flex">
									<div className="grid grid-cols-3 gap-4">
										<div className="flex flex-col">
											<h3>Dynasty Player</h3>
											{fantasyPlayer.dynastyPlayer ? (
												<div className="flex flex-col">
													<RosterPlayerCard
														player={fantasyPlayer.dynastyPlayer}
														type="Dynasty"
														selected
													/>

													{fantasyPlayer.selectedPoolPlayers.length === 0 && (
														<Button
															color="primary"
															onClick={(e) => {
																e.stopPropagation();
																removeDynastyPlayer();
															}}
															disabled={
																fantasyPlayer.id !== selectedFantasyPlayer?.id
															}
														>
															Remove
														</Button>
													)}
												</div>
											) : (
												<Button
													color="primary"
													onClick={(e) => {
														e.stopPropagation();
														setAppState("Dynasty");
													}}
													disabled={
														fantasyPlayer.id !== selectedFantasyPlayer?.id
													}
												>
													Select D'Nasty Player
												</Button>
											)}
										</div>
										<div>
											{fantasyPlayer.selectedPoolPlayers.length === 0 && (
												<div>
													<div>Selected Keeper Players</div>
													<div className="flex flex-col">
														{fantasyPlayer.poolPlayers.length < 3 && (
															<Button
																color="primary"
																disabled={
																	fantasyPlayer.id !== selectedFantasyPlayer?.id
																}
																onClick={(e) => {
																	e.stopPropagation();
																	setAppState("Pool");
																}}
															>
																Select Pool Player
															</Button>
														)}
														{fantasyPlayer.poolPlayers.map((player) => (
															<div key={player.id}>
																<RosterPlayerCard
																	key={player.id}
																	player={player}
																	type="Pool"
																/>
																<Button
																	color="primary"
																	disabled={
																		fantasyPlayer.id !==
																		selectedFantasyPlayer?.id
																	}
																	onClick={(e) => {
																		e.stopPropagation();
																		removePoolPlayer(
																			fantasyPlayer.id,
																			player.id,
																		);
																	}}
																>
																	Remove
																</Button>
															</div>
														))}
													</div>

													{fantasyPlayer.poolPlayers.length >= 3 && (
														<div className="mt-5">
															<Button
																className="btn-success w-full"
																color="secondary"
																disabled={
																	fantasyPlayer.id !==
																		selectedFantasyPlayer?.id ||
																	fantasyPlayer.selectedPoolPlayers.length !== 0
																}
																onClick={(e) => {
																	e.stopPropagation();
																	randomizePoolPlayers();
																}}
															>
																Randomize
															</Button>
														</div>
													)}
												</div>
											)}
											<div>
												<div>Selected Keepers</div>
												<div>
													{fantasyPlayer.selectedPoolPlayers?.map((player) => (
														<RosterPlayerCard
															key={player.id}
															player={player}
															type="Pool"
															selected
														/>
													))}
												</div>
											</div>
										</div>
										<div>
											<div>Not Selected</div>
											<div className="opacity-50">
												<RosterPlayerCard
													player={fantasyPlayer.poolPlayerNotInRoster}
													type="Pool"
												/>
											</div>
										</div>
									</div>
								</div>
								<Card.Actions className="justify-end">
									<Button
										color="ghost"
										onClick={() => deleteFantasyPlayer(fantasyPlayer.id)}
									>
										Delete Fantasy Player
									</Button>
								</Card.Actions>
							</Card.Body>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FantasyPlayerCard;
