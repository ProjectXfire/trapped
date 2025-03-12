import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

function AnimatedButton({ children, onClick, variant = "primary" }: Props): React.ReactElement {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${variant === "secondary" && styles["button--secondary"]}`}
        type="button"
        name="exit"
        onClick={onClick}
      >
        <div className={`${styles.text} ${variant === "secondary" && styles["text--secondary"]}`}>
          {children}
        </div>
        <div
          className={`${styles.block} ${variant === "secondary" && styles["block--secondary"]}`}
        ></div>
      </button>
      <div className={styles.body}>
        <div className={`${styles.face} ${variant === "secondary" && styles["face--secondary"]}`}>
          <div
            className={`${styles["left-eye"]} ${
              variant === "secondary" && styles["left-eye--secondary"]
            }`}
          />
          <div
            className={`${styles["right-eye"]} ${
              variant === "secondary" && styles["right-eye--secondary"]
            }`}
          />
        </div>
        <div
          className={`${styles["left-hand"]} ${
            variant === "secondary" && styles["left-hand--secondary"]
          }`}
        />
        <div
          className={`${styles["right-hand"]} ${
            variant === "secondary" && styles["right-hand--secondary"]
          }`}
        />
      </div>
    </div>
  );
}
export default AnimatedButton;
