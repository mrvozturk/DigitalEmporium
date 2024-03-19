'use client';
'use client';
import React, { useEffect, useRef } from 'react';
import styles from './index.module.css';

type SideBarProps = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
};

const SideBar: React.FC<SideBarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isSidebarOpen) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen, toggleSidebar]);

  return (
    <div ref={sidebarRef} className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
      <div className={styles.categoryLinks}>
        <button className={styles.closeButton} onClick={toggleSidebar}></button>
        <div className={styles.categories}>
          <ul>
            <li><a href='#'>KADIN</a></li>
            <li><a href='#'>ERKEK</a></li>
            <li><a href='#'>ÇOCUK</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
