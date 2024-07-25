'use client';
import React from 'react';
import sideBarStyles from './sideBar.module.css';
import { AiOutlineUser, AiOutlineHeart, AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';


interface SideBarProps {
  onCloseSidebar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onCloseSidebar }) => {
  const handleCloseSidebar = () => {
    onCloseSidebar();
  };

  return (
    <div className={sideBarStyles.overlay}>
      <div className={sideBarStyles.container}>
        <div className={sideBarStyles.header}>
          <a href='/' className={sideBarStyles.logo}>
            <Image
              src='/images/twitter_header_photo_1-removebg-preview.png'
              width={500}
              height={500}
              alt='logo'
            />
          </a>
          <div className={sideBarStyles.icons}>
            <Link href='/auth'>
              <AiOutlineUser onClick={handleCloseSidebar} />
            </Link>
            <Link href='/favorites'>
              <AiOutlineHeart onClick={handleCloseSidebar} />
            </Link>
            <AiOutlineClose onClick={handleCloseSidebar} />
          </div>
        </div>
        <div className={sideBarStyles.categoryLinks}>
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
      <div onClick={onCloseSidebar} className={sideBarStyles.overlayClose} />
    </div>
  );
};

export default SideBar;
