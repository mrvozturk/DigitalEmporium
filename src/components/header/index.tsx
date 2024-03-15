'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faHeart,
  faShoppingCart,
  faTimes,
  faBars,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.css';
import SideBar from './sideBar';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobileView, setMobileView] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMobileView(window.innerWidth < 770);

      const handleResize = () => {
        setMobileView(window.innerWidth < 770);
      };
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.combinedContainer}>
          <button className={styles.sidebarToggle} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
          </button>
          <div className={styles.logo}>
            <a href='#'>Logo</a>
          </div>

          <div className={styles.searchContainer}>
            {(isMobileView && isSearchOpen) || !isMobileView ? (
              <input
                className={styles.searchInput}
                type='search'
                name='search'
                placeholder={isMobileView ? ' Ara' : 'Ara...'}
                autoComplete='off'
              />
            ) : null}
          </div>
        </div>

        <div className={styles.navbarLinks}>
          <ul className={styles.primaryLinks}>
            <li>
              <a href='#' onClick={toggleSearch}>
                {isMobileView ? <FontAwesomeIcon icon={faSearch} /> : ''}
              </a>
            </li>
            <li>
              <a href='#'>
                {isMobileView ? <FontAwesomeIcon icon={faUser} /> : 'Hesap'}
              </a>
            </li>
            <li>
              <a href='#'>
                {isMobileView ? (
                  <FontAwesomeIcon icon={faHeart} />
                ) : (
                  'Favoriler'
                )}
              </a>
            </li>
            <li>
              <a href='#'>
                {isMobileView ? (
                  <FontAwesomeIcon icon={faShoppingCart} />
                ) : (
                  'Sepet'
                )}
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
