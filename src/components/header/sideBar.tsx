'use client';
import React, {  useEffect, useRef } from 'react';
import styles from './sideBar.module.css';

const SideBar = ({ toggleSidebar, isSidebarOpen }: { toggleSidebar: () => void; isSidebarOpen: boolean; }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as HTMLElement) && isSidebarOpen) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, toggleSidebar]);

  return (
    <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`} ref={sidebarRef}>
      <div className={styles.categoryLinks}>
        <button className={styles.closeButton} onClick={toggleSidebar}></button>
        <ul>
          <li><a href='#'>KADIN</a></li>
          <li><a href='#'>ERKEK</a></li>
          <li><a href='#'>ÇOCUK</a></li>
          <li><a href='#'>KADIN</a></li>
          <li><a href='#'>ERKEK</a></li>
          <li><a href='#'>ÇOCUK</a></li>
          <li><a href='#'>KADIN</a></li>
          <li><a href='#'>ERKEK</a></li>
          <li><a href='#'>ÇOCUK</a></li>
          <li><a href='#'>BEBEK</a></li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
