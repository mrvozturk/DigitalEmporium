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
import Link from 'next/link';
import Image from 'next/image';

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
          <Link href='/'>
            <Image
              src='/images/logo.png'
              alt='logo'
              width={100}
              height={100}
              className={styles.logo}
            />
          </Link>
        </div>
        <div className={styles.navbarLinks}>
          <ul>
            <li className={styles.navLink}>
              <Link href='/auth'>
                <span className={styles.linkText}>Hesap</span>
                <span className={styles.iconContainer}>
                  <AiOutlineUser className={styles.icon} />
                </span>
              </Link>
            </li>

            <li className={styles.navLink}>
              <Link href='/favorites'>
                <span className={styles.linkText}>Favoriler</span>
                <span className={styles.iconContainer}>
                  <AiOutlineHeart className={styles.icon} />
                </span>
              </Link>
            </li>
            <li className={styles.navLink}>
              <Link href='/basket'>
                <span className={styles.linkText}>Sepet</span>
                <span className={styles.iconContainer}>
                  <AiOutlineShoppingCart className={styles.icon} />
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {sideBarVisible && <SideBar onCloseSidebar={handleToggleSidebar} />}
    </div>
  );
};

export default Header;
