'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import style from './sideBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as HTMLElement) &&
      isSidebarOpen
    ) {
      setIsSidebarOpen(false);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleClickToggle = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <>
      <button className={style.sidebarToggle} onClick={handleClickToggle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div
        className={`${style.sidebar} ${isSidebarOpen ? style.sidebarOpen : ''}`}
        ref={sidebarRef}
      >
        <div className={style.categoryLinks}>
          <button className={style.closeButton} onClick={handleClickToggle}></button>
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
