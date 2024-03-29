'use client';
import React, { useState } from 'react';
import {
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineShoppingCart
} from 'react-icons/ai';
import styles from './index.module.css';
import style from './sideBar.module.css';

import SideBar from './sideBar';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <div>
      {isSidebarOpen && <div className={style.overlay}></div>}

      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <a href='/'>Logo</a>
        </div>
        <div className={styles.navbarLinks}>
          <ul>
            <li className={styles.navLink}>
              <a href='#HESAP'>Hesap</a>
              <AiOutlineUser className={styles.icon} />
            </li>
            <li className={styles.navLink}>
              <a href='#FAVORİLER'>Favoriler</a>
              <AiOutlineHeart className={styles.icon} />
            </li>
            <li className={styles.navLink}>
              <a href='#SEPET'>Sepet</a>
              <AiOutlineShoppingCart className={styles.icon} />
            </li>
          </ul>
        </div>
      </nav>

      <div className={style.categoryLinks}></div>

      <SideBar
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={handleToggleSidebar}
      />
    </div>
  );
};

export default Header;
