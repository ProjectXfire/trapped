import styles from "./styles.module.css";

interface Props {
  text: string;
  className?: string;
}

function AnimatedWord({ text, className }: Props): React.ReactElement {
  return (
    <div className={`${styles["animate-words"]} ${styles.item}`}>
      {Array.from(text).map((value, i) => {
        if (value !== " ")
          return (
            <span
              className={`${styles.letter} ${className}`}
              key={i}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {value}
            </span>
          );
        return <span key={i}>&nbsp;</span>;
      })}
    </div>
  );
}
export default AnimatedWord;
