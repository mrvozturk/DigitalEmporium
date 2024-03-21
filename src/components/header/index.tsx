'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faHeart,
  faShoppingCart,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.css';

import SideBar from './sideBar';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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
              <a href='#'>
                <FontAwesomeIcon icon={faSearch} />
              </a>
            </li>
            <li>
              <a href='#'>
                <FontAwesomeIcon icon={faUser} />
              </a>
            </li>
            <li>
              <a href='#'>
                <FontAwesomeIcon icon={faUser} />
              </a>
            </li>
            <li>
              <a href='#'>
                <FontAwesomeIcon icon={faUser} />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <SideBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default Header;
