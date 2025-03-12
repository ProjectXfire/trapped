import { useRef, useState } from "react";
import { Check } from "lucide-react";
import styles from "./styles.module.css";

interface Props {
  waitAction: () => void;
  text: string;
}

function ButtonAnimated({ waitAction, text }: Props): React.ReactElement {
  const [startAnimation, setStartAnimation] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const buttonTextRef = useRef<HTMLParagraphElement | null>(null);
  const circleRef = useRef<SVGSVGElement | null>(null);
  const circlePulseRef = useRef<HTMLDivElement | null>(null);
  const circleCheckRef = useRef<SVGSVGElement | null>(null);

  const handleAnimations = (): void => {
    if (
      !buttonRef.current ||
      !buttonTextRef.current ||
      !circleRef.current ||
      !circlePulseRef.current ||
      !circleCheckRef.current ||
      startAnimation
    )
      return;
    setStartAnimation(true);
    buttonRef.current.classList.add(styles["reduce-button-animation"]);
    buttonTextRef.current.classList.add(styles["hide-text-animation"]);
    circleRef.current.classList.add(styles["circle-slide-animation"]);
    circlePulseRef.current.classList.add(styles["circle-pulse-animation"]);
    circleCheckRef.current.classList.add(styles["circle-check-animation"]);
    setTimeout(() => {
      waitAction();
      setStartAnimation(false);
    }, 2500);
  };

  return (
    <div className={`${styles["button-animated"]}`}>
      <button ref={buttonRef} className={styles.button} onClick={handleAnimations}>
        <p ref={buttonTextRef} className={styles.button__text}>
          {text}
        </p>
      </button>
      <div ref={circlePulseRef} className={styles["circle-pulse"]}></div>
      <Check ref={circleCheckRef} className={styles["circle-check"]} size={30} />
      <svg ref={circleRef} className={styles.circle} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" />
      </svg>
    </div>
  );
}
export default ButtonAnimated;
