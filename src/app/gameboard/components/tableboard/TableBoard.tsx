import { getRandomNumber } from "@/shared/utils/random-number";
import { useTableBoard } from "../../states/useTableBoard";
import styles from "./styles.module.css";
import { ToastMessage } from "@/shared/components/messages";
import { hasChance } from "@/shared/utils/has-change";

function TableBoard(): React.ReactElement {
  const table = useTableBoard((s) => s.tableboard);
  const maxHoleToRemove = useTableBoard((s) => s.maxHoleToRemove);
  const maxMovements = useTableBoard((s) => s.maxMovements);
  const emptyBlocksIndexes = useTableBoard((s) => s.emptyBlocksIndexes);
  const modifiers = useTableBoard((s) => s.modifiers);
  const columns = useTableBoard((s) => s.columns);
  const tableStatus = useTableBoard((s) => s.status);
  const players = useTableBoard((s) => s.players);
  const playerTurn = useTableBoard((s) => s.playerTurn);
  const setPosition = useTableBoard((s) => s.setPosition);
  const setStatusPlayer = useTableBoard((s) => s.setStatusPlayer);
  const setMaxHolesToPlayer = useTableBoard((s) => s.setMaxHolesToPlayer);
  const setMaxMovementsToPlayer = useTableBoard((s) => s.setMaxMovementsToPlayer);
  const setPlayerTurn = useTableBoard((s) => s.setPlayerTurn);
  const setAWinner = useTableBoard((s) => s.setAWinner);
  const setPlayerInfo = useTableBoard((s) => s.setPlayerInfo);
  const setHoleInBlock = useTableBoard((s) => s.setHoleInBlock);

  const handleBlock = (column: number, row: number): void => {
    if (tableStatus !== "playing") return;
    const activePlayer = players[playerTurn];
    if (activePlayer.status === "move") {
      const pos = `${column}:${row}`;
      const canMove = activePlayer.posibleMovements.includes(pos);
      const block = table[column][row];
      if (block.status !== "empty") {
        ToastMessage.error("Invalid move!!");
        return;
      }
      if (!canMove) {
        ToastMessage.error("Invalid move!!");
        return;
      }
      const movements = activePlayer.maxMovements - 1;
      if (movements > 0 && hasChance(30)) {
        setMaxMovementsToPlayer(activePlayer.name, movements);
        setPosition(activePlayer.name, { column, row });
        setPlayerInfo(activePlayer.name, { movements: activePlayer.movements + 1 });
        ToastMessage.success(`${activePlayer.name} has additional move`);
        return;
      }
      setStatusPlayer(activePlayer.name, "add-hole");
      setPosition(activePlayer.name, { column, row });
      setMaxMovementsToPlayer(activePlayer.name, maxMovements);
      setPlayerInfo(activePlayer.name, { movements: activePlayer.movements + 1 });
    }
    if (activePlayer.status === "add-hole") {
      if (table[column][row].status === "occupied") return;
      if (table[column][row].status === "removed") return;
      const holes = activePlayer.removeHolePerTurn - 1;
      if (holes > 0 && hasChance(30)) {
        setMaxHolesToPlayer(activePlayer.name, holes);
        setHoleInBlock(column, row);
        setPlayerInfo(activePlayer.name, { blocksRemoved: activePlayer.blocksRemoved + 1 });
        setAWinner();
        ToastMessage.success(`${activePlayer.name} can set additional hole`);
        return;
      }
      if (modifiers["random-hole"].isActive) {
        const randomNumber = getRandomNumber(emptyBlocksIndexes.length);
        const [c, r] = emptyBlocksIndexes[randomNumber].split(":").map((v) => Number(v));
        setHoleInBlock(c, r);
      }
      setHoleInBlock(column, row);
      setMaxHolesToPlayer(activePlayer.name, maxHoleToRemove);
      setStatusPlayer(activePlayer.name, "move");
      setPlayerInfo(activePlayer.name, { blocksRemoved: activePlayer.blocksRemoved + 1 });
      setPlayerTurn(activePlayer.playerTurn);
      setAWinner();
    }
  };

  return (
    <div className={styles.container}>
      {tableStatus !== "playing" && (
        <div className={styles["blocked-background"]}>
          <p className={styles["blocked-background__text"]}>Create a New Game 🕹️</p>
        </div>
      )}
      <div className={styles["gameboard-container"]}>
        <ul
          className={styles.gameboard}
          style={{
            gridTemplateColumns: `repeat(${columns}, 60px)`,
            gridTemplateRows: `repeat(${columns}, 60px)`,
          }}
        >
          {table.map((rows, i) =>
            rows.map((block, k) => (
              <li key={`${i}${k}`} className={styles.block} onClick={() => handleBlock(i, k)}>
                <img className={styles.arrow} src="/arrow.gif" alt="arrow" />
                <img className={styles.floor} src="/floor.jpg" alt="floor" />
                {block.status === "removed" && (
                  <img className={styles.hole} src="/hole.png" alt="hole" />
                )}
                {players.map((player, index) => (
                  <div className={styles.player} key={index}>
                    {player.position === `${i}:${k}` && <img src={player.avatar} alt="avatar" />}
                  </div>
                ))}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
export default TableBoard;
