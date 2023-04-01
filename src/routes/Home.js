import styles from "./Home.module.css";
import Header from "../components/header/Header";
import Body from "../components/body/Body";
import Footer from "../components/footer/Footer";

function Home() {
  return (
    <div>
      <div className={styles.home}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.body}>
          <Body />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

<style></style>;

export default Home;
