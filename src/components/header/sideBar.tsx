'use client';
import React from 'react';
import style from './sideBar.module.css';
import {
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineClose
} from 'react-icons/ai';

interface SideBarProps {
  onCloseSidebar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onCloseSidebar }) => {

  return (
    <div style={{
      position: 'absolute',
      display: 'flex',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: 999
    }}>
      {/* CONTENT AREA */}
      <div
        style={{
          width: '75%',
          maxWidth: 570,
          height: '100%',
          flexDirection: 'row',
          backgroundColor: '#fff'
        }}
      >
        {/* HEADER AREA */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#f2f2f2',
          justifyContent: 'space-between',
          padding: '0.4rem 0.7rem'
        }}>
          <div >
            <a href='/' style={{
              fontSize: '1.7em'

            }}>LOGO</a>
          </div>
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            <button>
              <AiOutlineUser style={{
                fontSize: '1.2em'
              }} />
            </button>

            <button>
              <AiOutlineHeart style={{
                fontSize: '1.2em'
              }} />
            </button>

            <button onClick={onCloseSidebar}>
              <AiOutlineClose style={{
                fontSize: '1.2em'
              }} />
            </button>
          </div>
        </div>

        {/* CATEGORY LIST AREA */}
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

      {/* CLOSABLE AREA */}
      <div
        onClick={onCloseSidebar}
        style={{
          width: '25%',
          height: '100%',
        }} />
    </div >
  );
};

export default SideBar;
