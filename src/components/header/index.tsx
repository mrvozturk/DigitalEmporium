'use client';
import React, { useState } from 'react';

import styles from './index.module.css';

import SideBar from './sideBar';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <a href='/'>Logo</a>
        </div>
        <button className={styles.sidebarToggle} onClick={toggleSidebar}>
          ☰
        </button>
        <div className={styles.navbarLinks}>
          <ul>
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

      <SideBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default Header;
