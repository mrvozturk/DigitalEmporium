import React from 'react';
import styles from './index.module.css';

const Header = () => {
  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.combinedContainer}>
          <div className={styles.logo}>
            <a href='#'>Logo</a>
          </div>
          <div className={styles.searchContainer}>
            <input
              className={styles.searchInput}
              type='search'
              name='search'
              placeholder='Search here'
              autoComplete='off'
            />
          </div>
        </div>

        <div className={styles.navbarLinks}>
          <ul className={styles.primaryLinks}>
            <li>
              <a href='#'>Mağaza</a>
            </li>
            <li>
              <a href='#'>Hesap</a>
            </li>
            <li>
              <a href='#'>Favoriler</a>
            </li>
            <li>
              <a href='#'>Sepet</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className={styles.categoryLinks}>
        <a href='#'>KADIN</a>
        <a href='#'>ERKEK</a>
        <a href='#'>ÇOCUK</a>
        <a href='#'>BEBEK</a>
        <a href='#'>FIRSATLAR</a>
        <a href='#'>SÜRDÜRÜLEBİLİRLİK</a>
        <a href='#'>KADIN</a>
        <a href='#'>ERKEK</a>
        <a href='#'>ÇOCUK</a>
        <a href='#'>BEBEK</a>
        <a href='#'>FIRSATLAR</a>
        <a href='#'>SÜRDÜRÜLEBİLİRLİK</a>
      </div>
    </div>
  );
};

export default Header;
