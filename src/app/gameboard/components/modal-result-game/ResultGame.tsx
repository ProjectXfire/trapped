import styles from "./styles.module.css";

import { useSelecting } from "../../states/useSelecting";
import { useTableBoard } from "../../states/useTableBoard";
import Confetti from "react-confetti";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui";
import { AnimatedButton, AnimatedWord } from "@/shared/components/animations";

function ModalResultGame(): React.ReactElement {
  const winner = useTableBoard((s) => s.winner);
  const resetGame = useTableBoard((s) => s.resetGame);
  const open = useSelecting((s) => s.open);

  const hasEnded = !!winner;

  const handleNewGame = (): void => {
    resetGame();
    open();
  };

  return (
    <>
      {hasEnded && (
        <Confetti
          style={{ zIndex: 100 }}
          width={window.screen.width}
          height={window.screen.height}
        />
      )}
      <Dialog open={hasEnded}>
        <DialogContent hideClose className={styles.content}>
          <DialogHeader>
            <DialogTitle className={styles.title}>
              <AnimatedWord className={styles["player-box__name"]} text="Congratulations" />
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className={styles["player-box"]}>
            <AnimatedWord
              className={styles["player-box__name"]}
              text={winner?.name ?? "Player Name"}
            />
            <AnimatedWord className={styles["player-box__message"]} text="has win 🎉!!" />
          </div>
          <DialogFooter className={styles.footer}>
            <AnimatedButton variant="secondary" onClick={resetGame}>
              Close
            </AnimatedButton>
            <AnimatedButton onClick={handleNewGame}>Start new game</AnimatedButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default ModalResultGame;
