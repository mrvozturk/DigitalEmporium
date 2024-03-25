'use client';
import React, { useEffect, useRef } from 'react';
import style from './sideBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
faBars
} from '@fortawesome/free-solid-svg-icons';

const SideBar = ({
  toggleSidebar,
  isSidebarOpen
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as HTMLElement) &&
        isSidebarOpen
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, toggleSidebar]);

  return (
    <>
      <button className={style.sidebarToggle} onClick={toggleSidebar}>
      <FontAwesomeIcon icon={faBars} />
      </button>
      <div
        className={`${style.sidebar} ${isSidebarOpen ? style.sidebarOpen : ''}`}
        ref={sidebarRef}
      >
        <div className={style.categoryLinks}>
          <button
            className={style.closeButton}
            onClick={toggleSidebar}
          ></button>
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
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
