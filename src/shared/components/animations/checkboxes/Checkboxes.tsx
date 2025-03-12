import { useState } from "react";
import styles from "./styles.module.css";

type Values = { value: string; label: string };

interface Props {
  values: Values[];
  initValuesActive: string[];
  onSelectValues: (selectedValues: string[]) => void;
}

function Checkboxes({ values, onSelectValues, initValuesActive }: Props): React.ReactElement {
  const [selectedValues, setSelectedValues] = useState<string[]>(initValuesActive);

  const handleValues = (value: string) => {
    if (selectedValues.includes(value)) {
      const newValues = [...selectedValues].filter((selected) => selected !== value);
      setSelectedValues(newValues);
      onSelectValues(newValues);
    } else {
      const newValues = [...selectedValues, value];
      setSelectedValues(newValues);
      onSelectValues(newValues);
    }
  };

  return (
    <div className={styles["checkbox-list"]}>
      {values.map((val, i) => (
        <button
          className={`${styles.checkbox} ${
            selectedValues.includes(val.value) && styles["checkbox--selected"]
          }`}
          key={i}
          type="button"
          name={`checkbox-${i}`}
          onClick={() => handleValues(val.value)}
        >
          <div className={styles.checkbox__box}>
            <div
              className={`${styles["checkbox__box--selected"]} ${
                selectedValues.includes(val.value) && styles["checkbox__box--animate"]
              }`}
            />
          </div>
          <p className={styles.checkbox__text}>{val.label}</p>
        </button>
      ))}
    </div>
  );
}

export default Checkboxes;
