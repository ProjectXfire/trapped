import type { ModifierKeys } from "../../states/useTableBoard";
import { useTableBoard } from "../../states/useTableBoard";
import { useOptions } from "../../states/useOptions";
import styles from "./styles.module.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui";
import { AnimatedButton, Checkboxes } from "@/shared/components/animations";

function ModalOptions() {
  const isOpen = useOptions((s) => s.isOpen);
  const close = useOptions((s) => s.close);
  const modifiers = useTableBoard((s) => s.modifiers);
  const setModifiers = useTableBoard((s) => s.setModifiers);

  const options = Object.keys(modifiers).map((key) => ({
    label: modifiers[key as ModifierKeys].description,
    value: key,
  }));

  const activesValues = Object.keys(modifiers).filter(
    (key) => modifiers[key as ModifierKeys].isActive
  );

  const handleOptions = (values: string[]): void => {
    setModifiers(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent hideClose className={styles.content}>
        <DialogHeader>
          <DialogTitle className={styles.title}>New Options</DialogTitle>
          <DialogDescription className={styles.description}>
            Add new modifiers to the game to be more interested.
          </DialogDescription>
        </DialogHeader>
        <Checkboxes
          values={options}
          onSelectValues={handleOptions}
          initValuesActive={activesValues}
        />
        <DialogFooter>
          <AnimatedButton onClick={close}>Close</AnimatedButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default ModalOptions;
