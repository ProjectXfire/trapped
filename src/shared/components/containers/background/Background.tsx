import { Outlet } from "react-router";
import styles from "./styles.module.css";
import { Toaster } from "../../ui";

function Background(): React.ReactElement {
  return (
    <>
      <div className={styles.background} />
      <Toaster richColors />
      <Outlet />
    </>
  );
}
export default Background;
