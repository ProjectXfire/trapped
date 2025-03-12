import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

function FadeIn({ children }: Props): React.ReactElement {
  return <div className={styles.container}>{children}</div>;
}
export default FadeIn;
