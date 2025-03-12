import { AnimatedButton } from "@/shared/components/animations";
import { useInstruction } from "../../states/useInstruction";
import styles from "./styles.module.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui";

const instructions = [
  "Choose you initial position in the tableboard.",
  "Each turn you can move one block that are around you.",
  "The direction of the move can be right, left, up, down or diagonal.",
  "After move, you can choose one block to remove it from the tableboard.",
  "Player can not move in a block removed.",
  "Player can not move in a block occupied by a player.",
  "Lose the player that can not have any move.",
  "Choose the correct block to remove to trap your opponent.",
];

function ModalInstruction(): React.ReactElement {
  const isOpen = useInstruction((s) => s.isOpen);
  const close = useInstruction((s) => s.close);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent hideClose className={styles.content}>
        <DialogHeader>
          <DialogTitle className={styles.title}>Instructions</DialogTitle>
          <DialogDescription />
          <div className={styles.description}>
            {instructions.map((text, i) => (
              <p className={styles.instruction} key={i}>
                <span>{i + 1}</span>
                {text}
              </p>
            ))}
          </div>
        </DialogHeader>
        <DialogFooter>
          <AnimatedButton onClick={close}>Close</AnimatedButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default ModalInstruction;
