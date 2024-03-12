import React from "react";
import styles from "./index.module.css";

const Header = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.combinedContainer}>
        <div className={styles.logo}>
          <a href="#">Logo</a>
        </div>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            type="search"
            name="search"
            placeholder="Search here"
            autoComplete="off"
          />
          <button className={styles.searchButton}>Search</button>
        </div>
      </div>
      <div className={styles.navbarLinks}>
        <ul>
          <li><a href="#">Mağaza</a></li>
          <li><a href="#">Hesap</a></li>
          <li><a href="#">Favoriler</a></li>
          <li><a href="#">Sepet</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
