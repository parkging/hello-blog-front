import { useState } from "react";
import styles from "./Home.module.css";
import Header from "../components/header/Header";
import Body from "../components/body/Body";
import Footer from "../components/footer/Footer";

function Home({ jwt, onLogout, member }) {
  const [sideMenuShow, setSideMenuShow] = useState(false);

  const handleClose = () => setSideMenuShow(false);
  const handleShow = () => setSideMenuShow(true);
  return (
    <div>
      <div className={styles.home}>
        <div className={styles.header}>
          <Header jwt={jwt} onLogout={onLogout} handleShow={handleShow} />
        </div>
        <div className={styles.body}>
          <Body
            jwt={jwt}
            member={member}
            sideMenuShow={sideMenuShow}
            handleClose={handleClose}
          />
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
