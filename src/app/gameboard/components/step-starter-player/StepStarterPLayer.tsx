import { useTableBoard } from "../../states/useTableBoard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";
import styles from "./styles.module.css";
import { FadeIn } from "@/shared/components/containers";

function StepStarterPLayer(): React.ReactElement {
  const players = useTableBoard((s) => s.players);
  const setStarterPlayer = useTableBoard((s) => s.setStarterPlayer);

  const handleStaterPlayer = (playerTurnString: string) => {
    setStarterPlayer(Number(playerTurnString));
  };

  return (
    <FadeIn>
      <p className={styles.description}>Select the player who start the game.</p>
      <Select onValueChange={(value) => handleStaterPlayer(value)}>
        <SelectTrigger className={styles["select-trigger"]}>
          <SelectValue placeholder="Select a player" />
        </SelectTrigger>
        <SelectContent className={styles["select-content"]}>
          <SelectGroup>
            <SelectLabel className={styles["select-label"]}>All Players</SelectLabel>
            {players.map((player) => (
              <SelectItem
                key={player.name}
                className={styles["select-item"]}
                value={player.playerTurn.toString()}
              >
                {player.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FadeIn>
  );
}
export default StepStarterPLayer;
