'use client';
import React, { useState, useEffect } from 'react';
import { AiOutlineUser, AiOutlineHeart, AiOutlineMenu } from 'react-icons/ai';
import SideBar from './sideBar';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import CartIcon from './../cartIcon';

const Header = () => {
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const { data: session } = useSession();

  const handleToggleSidebar = () => {
    setSideBarVisible(prevState => !prevState);
  };

  useEffect(() => {
    document.body.style.overflow = sideBarVisible ? 'hidden' : 'auto';
  }, [sideBarVisible]);

  return (
    <div>
      <nav className='flex items-center justify-between bg-gray-100 p-2 md:p-3'>
        <div className='flex items-center'>
          <button className='text-xl md:hidden' onClick={handleToggleSidebar}>
            <AiOutlineMenu />
          </button>
          <Link href='/'>
            <Image
              src='/images/logo.png'
              alt='logo'
              width={100}
              height={100}
              className='w-28 h-12 md:w-40 md:h-14'
              priority
            />
          </Link>
        </div>

        <div className='flex md:space-x-8'>
          <ul className='flex items-center space-x-6'>
            <li>
              <Link
                href={session ? '/profile' : '/auth'}
                className='flex items-center hover:text-gray-600'
              >
                <span className='hidden md:block mr-6'>Profil</span>
                <AiOutlineUser className='block md:hidden text-lg' />
              </Link>
            </li>
            <li>
              <Link href='#' className='flex items-center hover:text-gray-600'>
                <span className='hidden md:block mr-6'>Favoriler</span>
                <AiOutlineHeart className='block md:hidden text-lg' />
              </Link>
            </li>

            {/* SEPET */}
            <li>
              <CartIcon />
            </li>
          </ul>
        </div>
      </nav>
      {sideBarVisible && <SideBar onCloseSidebar={handleToggleSidebar} />}
    </div>
  );
};

export default Header;
