import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useInstruction } from "../../states/useInstruction";
import { useTableBoard } from "../../states/useTableBoard";
import { useSelecting } from "../../states/useSelecting";
import { useOptions } from "../../states/useOptions";
import styles from "./styles.module.css";
import { CircleArrowDown } from "lucide-react";
import { AnimatedButton, AnimatedText } from "@/shared/components/animations";
import { FadeIn } from "@/shared/components/containers";
import CardPlayer from "../card-player/CardPlayer";

function Sidebar(): React.ReactElement {
  const navigate = useNavigate();
  const opeInstructions = useInstruction((s) => s.open);
  const players = useTableBoard((s) => s.players);
  const resetGame = useTableBoard((s) => s.resetGame);
  const playerTurn = useTableBoard((s) => s.playerTurn);
  const openNewGame = useSelecting((s) => s.open);
  const openOptions = useOptions((s) => s.open);

  const [expandMenu, setExpandMenu] = useState(true);
  const [menuSize, setMenuSize] = useState(240);

  const isBigSize = useMediaQuery({ query: "(min-width: 500px)" });

  const handleExpandedMenu = (): void => {
    setExpandMenu((cv) => !cv);
  };

  const startNewGame = (): void => {
    resetGame();
    openNewGame();
  };

  const exit = (): void => {
    navigate("/");
  };

  useEffect(() => {
    if (isBigSize) {
      setMenuSize(240);
    } else {
      setMenuSize(360);
    }
  }, [isBigSize]);

  return (
    <FadeIn>
      <nav className={styles.navbar}>
        <AnimatedText text="TRAPPED" />
        <div className={styles.navbar__actions}>
          <AnimatedButton onClick={opeInstructions}>Instructions</AnimatedButton>
          <AnimatedButton onClick={exit}>Exit</AnimatedButton>
        </div>
        <div className={styles.navbar__bar} />
      </nav>
      <div className={styles["navbar-content-container"]}>
        <div className={styles["navbar-expand-content"]}>
          <AnimatedButton variant="secondary" onClick={handleExpandedMenu}>
            <div className={styles["navbar-expand-content__button"]}>
              {expandMenu ? "Hide" : "Show"}{" "}
              <CircleArrowDown
                className={`${styles.icon} ${!expandMenu && styles["icon--rotated"]}`}
                size={18}
              />
            </div>
          </AnimatedButton>
        </div>
        <div
          className={`${styles["navbar-content"]}`}
          style={{ height: expandMenu ? menuSize : 0 }}
        >
          <div className={styles["navbar-content__cards"]}>
            {players.map((player) => (
              <CardPlayer
                key={player.name}
                data={player}
                isActive={player.playerTurn === playerTurn}
              />
            ))}
          </div>
          <AnimatedButton onClick={startNewGame}>New game</AnimatedButton>
          <AnimatedButton onClick={openOptions}>Add options</AnimatedButton>
        </div>
      </div>
    </FadeIn>
  );
}
export default Sidebar;
