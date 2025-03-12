import { useTableBoard } from "../../states/useTableBoard";
import { useSelecting } from "../../states/useSelecting";
import { useOptions } from "../../states/useOptions";
import styles from "./styles.module.css";
import CardPlayer from "../card-player/CardPlayer";
import { AnimatedButton } from "@/shared/components/animations";

function Sidemenu(): React.ReactElement {
  const players = useTableBoard((s) => s.players);
  const resetGame = useTableBoard((s) => s.resetGame);
  const playerTurn = useTableBoard((s) => s.playerTurn);
  const openStartGame = useSelecting((s) => s.open);
  const openOptions = useOptions((s) => s.open);

  const startNewGame = (): void => {
    resetGame();
    openStartGame();
  };

  return (
    <aside className={styles.sidemenu}>
      {players.map((player) => (
        <CardPlayer key={player.name} data={player} isActive={player.playerTurn === playerTurn} />
      ))}
      <div className={styles.sidemenu__options}>
        <AnimatedButton onClick={startNewGame}>New game</AnimatedButton>
        <AnimatedButton onClick={openOptions}>Add options</AnimatedButton>
      </div>
    </aside>
  );
}

export default Sidemenu;
