'use client';
import React from 'react';
import styles from './index.module.css';

type SideBarProps = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
};

const SideBar: React.FC<SideBarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <div
      className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}
    >
      <div className={styles.categoryLinks}>
        <button className={styles.closeButton} onClick={toggleSidebar}></button>

        <ul>
          <li>
            <a href='#'>KADIN</a>
          </li>
          <li>
            <a href='#'>ERKEK</a>
          </li>
          <li>
            <a href='#'>ÇOCUK</a>
          </li>
          <li>
            <a href='#'>BEBEK</a>
          </li>
          <li>
            <a href='#'>FIRSATLAR</a>
          </li>
          <li>
            <a href='#'>SÜRDÜRÜLEBİLİRLİK</a>
          </li>
          <li>
            <a href='#'>KADIN</a>
          </li>
          <li>
            <a href='#'>ERKEK</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
