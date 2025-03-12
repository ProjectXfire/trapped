import type { Player } from "../../models/player";
import styles from "./styles.module.css";
import { Check, X } from "lucide-react";

interface Props {
  data: Player;
  isActive: boolean;
}

function CardPlayer({ data, isActive = false }: Props) {
  return (
    <article className={`${styles.card} ${isActive && styles["card--active"]}`}>
      <header className={styles.card__header}>
        <h1 className={styles.name}>{data.name}</h1>
        {isActive ? (
          <Check className={styles["turn-active"]} />
        ) : (
          <X className={styles["turn-desactive"]} />
        )}
      </header>
      <div className={styles.card__info}>
        <p>Movements</p>
        <p>{data.movements}</p>
      </div>
      <div className={styles.card__info}>
        <p>Blocks removed</p>
        <p>{data.blocksRemoved}</p>
      </div>
    </article>
  );
}
export default CardPlayer;
