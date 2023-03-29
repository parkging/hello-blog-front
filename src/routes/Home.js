import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Header from "../components/header/Header";
import Body from "../components/body/Body";
import Footer from "../components/footer/Footer";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.1&sort_by=year"
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div class={styles.home}>
          <div class={styles.header}>
            <Header />
          </div>
          <div class={styles.body}>
            <Body />
          </div>
          <div class={styles.footer}>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}

<style></style>;

export default Home;
