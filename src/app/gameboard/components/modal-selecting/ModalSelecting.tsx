import { useState } from "react";
import { useSelecting } from "../../states/useSelecting";
import { useTableBoard } from "../../states/useTableBoard";
import styles from "./styles.module.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui";
import StepSelectingPosition from "../step-selecting-position/StepSelectingPosition";
import StepStarterPLayer from "../step-starter-player/StepStarterPLayer";
import { AnimatedButton } from "@/shared/components/animations";

const startStep = 0;
const endStep = 1;

function ModalSelecting(): React.ReactElement {
  const isOpen = useSelecting((s) => s.isOpen);
  const close = useSelecting((s) => s.close);
  const startGame = useTableBoard((s) => s.startGame);
  const resetGame = useTableBoard((s) => s.resetGame);

  const [step, setStep] = useState(0);

  const cancel = (): void => {
    resetGame();
    close();
  };

  const nextStep = (): void => {
    const newStep = Math.min(step + 1, endStep);
    setStep(newStep);
  };

  const previousStep = (): void => {
    const newStep = Math.max(0, step - 1);
    setStep(newStep);
  };

  const handleStart = (): void => {
    setStep(startStep);
    startGame();
    close();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent hideClose className={styles.container}>
        <DialogHeader className={styles.header}>
          <DialogTitle className={styles.title}>Starting new game</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        {step === 0 && <StepSelectingPosition />}
        {step === 1 && <StepStarterPLayer />}
        <DialogFooter>
          {step === startStep && (
            <AnimatedButton variant="secondary" onClick={cancel}>
              Cancel
            </AnimatedButton>
          )}
          {step > startStep && (
            <AnimatedButton variant="secondary" onClick={previousStep}>
              Back
            </AnimatedButton>
          )}
          {step < endStep && <AnimatedButton onClick={nextStep}>Continue</AnimatedButton>}
          {step === endStep && <AnimatedButton onClick={handleStart}>Start</AnimatedButton>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default ModalSelecting;
