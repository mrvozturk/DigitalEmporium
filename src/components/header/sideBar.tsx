'use client';
import React, { useEffect, useRef, useCallback } from 'react';
import style from './sideBar.module.css';
import {
  faBars,
  faUser,
  faHeart,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SideBarProps {
  isSidebarOpen: boolean;
  onCloseSidebar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isSidebarOpen, onCloseSidebar }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as HTMLElement) &&
        isSidebarOpen
      ) {
        onCloseSidebar();
      }
    },
    [isSidebarOpen, onCloseSidebar]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      <button className={style.sidebarToggle} onClick={onCloseSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>

     
      <div
        className={`${style.sidebar} ${isSidebarOpen ? style.sidebarOpen : ''}`}
        ref={sidebarRef}
      >
        <div className={style.sidebarlogo}>
          <a href='/'>LOGO</a>
        </div>
        <div className={style.sidebarLinks}>
          <ul>
            <li>
              <a href='#'>
                <FontAwesomeIcon icon={faUser} />
              </a>
            </li>
            <li>
              <a href='#'>
                <FontAwesomeIcon icon={faHeart} />
              </a>
            </li>
            <li>
            <FontAwesomeIcon
      icon={faTimes}
      className={style.closeIcon}
    />
            </li>
          </ul>
        </div>

        <div className={style.categoryLinks}>
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
