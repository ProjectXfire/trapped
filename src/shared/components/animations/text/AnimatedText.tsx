import styles from "./styles.module.css";

interface Props {
  text: string;
  color?: string;
}

function AnimatedText({ text, color = "var(--orange-color-1)" }: Props): React.ReactElement {
  return (
    <div className={styles.container}>
      {text.split("").map((letter, i) => (
        <div className={styles.letter} key={i}>
          <p
            className={styles.letter__char}
            style={{
              color,
              animationDelay: `${i * 500}ms`,
            }}
          >
            {letter}
          </p>
          <div
            className={styles.letter__circle}
            style={{ background: color, animationDelay: `${i * 500}ms` }}
          />
        </div>
      ))}
    </div>
  );
}
export default AnimatedText;
