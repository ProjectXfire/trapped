import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

function ContentLimit({ children }: Props): React.ReactElement {
  return <main className={styles.content}>{children}</main>;
}
export default ContentLimit;
