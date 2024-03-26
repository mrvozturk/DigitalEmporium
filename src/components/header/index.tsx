'use client';
import React, { useState } from 'react';
import styles from './index.module.css';
import SideBar from './sideBar';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <a href='/'>Logo</a>
        </div>
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

      <SideBar
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={handleToggleSidebar}
      />
    </div>
  );
};

export default Header;
