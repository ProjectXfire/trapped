import { useState } from "react";
import { useTableBoard } from "../../states/useTableBoard";
import styles from "./styles.module.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui";
import { FadeIn } from "@/shared/components/containers";

function StepSelectingPosition(): React.ReactElement {
  const columns = useTableBoard((s) => s.columns);
  const table = useTableBoard((s) => s.tableboard);
  const players = useTableBoard((s) => s.players);

  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const setPosition = useTableBoard((s) => s.setPosition);

  const handlePosition = (column: number, row: number): void => {
    if (!selectedPlayer) return;
    setPosition(selectedPlayer, { column, row });
  };

  return (
    <FadeIn>
      <p className={styles.description}>
        Select a player and then select the position in the tableboard.
      </p>
      <Select onValueChange={(value) => setSelectedPlayer(value)}>
        <SelectTrigger className={styles["select-trigger"]}>
          <SelectValue placeholder="Select a player" />
        </SelectTrigger>
        <SelectContent className={styles["select-content"]}>
          <SelectGroup>
            <SelectLabel className={styles["select-label"]}>All Players</SelectLabel>
            {players.map((player) => (
              <SelectItem key={player.name} className={styles["select-item"]} value={player.name}>
                {player.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ul
        className={styles.content}
        style={{
          gridTemplateColumns: `repeat(${columns}, 35px)`,
          gridTemplateRows: `repeat(${columns}, 35px)`,
        }}
      >
        {table.map((rows, i) =>
          rows.map((_, k) => (
            <li key={`${i}${k}`} className={styles.block} onClick={() => handlePosition(i, k)}>
              <img className={styles.arrow} src="/arrow.gif" alt="arrow" />
              <img className={styles.floor} src="/floor.jpg" alt="floor" />
              {players.map((player, index) => (
                <div className={styles.player} key={index}>
                  {player.position === `${i}:${k}` && <img src={player.avatar} alt="avatar" />}
                </div>
              ))}
            </li>
          ))
        )}
      </ul>
    </FadeIn>
  );
}
export default StepSelectingPosition;
