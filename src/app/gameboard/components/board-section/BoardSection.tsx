import styles from "./styles.module.css";

interface Props {
  content: React.ReactNode;
  sidemenu: React.ReactNode;
  navbar: React.ReactNode;
}

function BoardSection({ content, navbar, sidemenu }: Props): React.ReactElement {
  return (
    <main className={styles.container}>
      <section className={styles.sidemenu}>{sidemenu}</section>
      <section className={styles.content}>
        {navbar}
        {content}
      </section>
    </main>
  );
}
export default BoardSection;
