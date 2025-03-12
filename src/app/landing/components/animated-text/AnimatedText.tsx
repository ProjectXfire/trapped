import styles from "./styles.module.css";

interface Props {
  text: string;
}

function AnimatedText({ text }: Props): React.ReactElement {
  return (
    <div className={styles.container}>
      {text.split("").map((letter, i) => (
        <div key={i} className={styles["animate-text"]} style={{ animationDelay: `${i * 100}ms` }}>
          {letter}
        </div>
      ))}
    </div>
  );
}
export default AnimatedText;
