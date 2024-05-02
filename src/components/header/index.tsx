'use client';
import React, { useState, useEffect } from 'react';
import {
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineMenu
} from 'react-icons/ai';
import styles from './index.module.css';
import sideBarStyles from './sideBar.module.css';

import SideBar from './sideBar';

const Header = () => {
  const [sideBarVisible, setSideBarVisible] = useState(false);

  const handleToggleSidebar = () => {
    setSideBarVisible(prevState => !prevState);
  };

  useEffect(() => {
    if (sideBarVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [sideBarVisible]);

  return (
    <div>
      <nav className={styles.navbar}>
        <div
          style={{
            flexDirection: 'row',
            display: 'flex'
          }}
        >
          <button
            className={styles.sidebarToggle}
            onClick={handleToggleSidebar}
          >
            <AiOutlineMenu />
          </button>
          <div className={styles.logo}>
            <a href='/'>LOGO</a>
          </div>
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

      {sideBarVisible && <SideBar onCloseSidebar={handleToggleSidebar} />}
    </div>
  );
};

export default Header;