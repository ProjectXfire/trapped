import type { BlockStatus } from "../../models/block";
import type { Player } from "../../models/player";
import styles from "./styles.module.css";

interface Props {
  blockStatus: BlockStatus;
  onClick: (column: number, row: number) => void;
  players: Player[];
  position: [number, number];
  turn: number;
}

function Block({ blockStatus, onClick, players, position, turn }: Props): React.ReactElement {
  const [column, row] = position;

  return (
    <li key={`${column}${row}`} className={styles.block} onClick={() => onClick(column, row)}>
      <img className={styles.arrow} src="/arrow.gif" alt="arrow" />
      <img className={styles.floor} src="/floor.jpg" alt="floor" />
      {blockStatus === "removed" && <img className={styles.hole} src="/hole.png" alt="hole" />}
      {players.map((player, index) => (
        <div className={styles.player} key={index}>
          {player.position === `${column}:${row}` && (
            <>
              {player.status === "move" && player.playerTurn === turn && (
                <img className={styles.walking} src="/walking.gif" />
              )}
              {player.status === "add-hole" && player.playerTurn === turn && (
                <img className={styles.bomb} src="/bomb.png" />
              )}
              <img src={player.avatar} alt="avatar" />
            </>
          )}
        </div>
      ))}
    </li>
  );
}
export default Block;
