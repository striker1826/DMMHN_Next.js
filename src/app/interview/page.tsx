import Ready from "@/widgets/interview/Ready/Ready";
import styles from "./page.module.scss";
import Header from "@/shared/components/Header/Header";

const page = () => {
  return (
    <>
      <Header />
      <main className={styles.layout}>
        <Ready />
      </main>
    </>
  );
};

export default page;
