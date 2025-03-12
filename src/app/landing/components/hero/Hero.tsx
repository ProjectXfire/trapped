import { useNavigate } from "react-router";
import ButtonAnimated from "../button/ButtonAnimated";
import styles from "./styles.module.css";
import AnimatedText from "../animated-text/AnimatedText";

function Hero(): React.ReactElement {
  const navigate = useNavigate();

  const navigateToGame = (): void => {
    navigate("/game");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.hero__content}>
        <AnimatedText text="TRAPPED" />
        <p className={styles.text}>Elaborate a strategy to trap your opponent!</p>
        <p className={styles.subtext}>Thinks the move you will do</p>
        <ButtonAnimated text="Start playing" waitAction={navigateToGame} />
      </div>
      <div className={styles.hero__image}>
        <img src="/bear.jpg" alt="hero" />
      </div>
    </section>
  );
}
export default Hero;
