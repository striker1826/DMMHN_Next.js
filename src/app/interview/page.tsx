import styles from "./page.module.scss";
import Header from "@/shared/components/Header/Header";
import { Simulation } from "@/widgets/interview";

const page = () => {
  return (
    <>
      <Header />
      <main className={styles.layout}>
        <Simulation />
      </main>
    </>
  );
};

export default page;
