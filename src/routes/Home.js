import styles from "./Home.module.css";
import Header from "../components/header/Header";
import Body from "../components/body/Body";
import Footer from "../components/footer/Footer";

function Home({ jwt, setJwt }) {
  return (
    <div>
      <div className={styles.home}>
        <div className={styles.header}>
          <Header jwt={jwt} setJwt={setJwt} />
        </div>
        <div className={styles.body}>
          <Body jwt={jwt} setJwt={setJwt} />
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
