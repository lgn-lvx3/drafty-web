import type React from "react";
import { Card, Button, Input } from "react-daisyui";
import { useState } from "react";
import { useAppStore } from "../store/AppStore";

export const AddFantasyTeamCard: React.FC = () => {
	const [teamName, setTeamName] = useState("");
	const { createFantasyPlayer } = useAppStore();
	return (
		<Card className="bg-base-100 max-w-96">
			<Card.Body>
				<Card.Title tag="h2" className="text-2xl">
					Add Fantasy Team
				</Card.Title>
				<Input
					placeholder="Team Name"
					value={teamName}
					onChange={(e) => setTeamName(e.target.value)}
				/>
				<Card.Actions>
					<Button
						color="primary"
						onClick={() => {
							createFantasyPlayer(teamName);
							setTeamName("");
						}}
						disabled={!teamName}
					>
						Add
					</Button>
				</Card.Actions>
			</Card.Body>
		</Card>
	);
};

export default AddFantasyTeamCard;
