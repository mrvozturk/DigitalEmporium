'use client';
import React, { useState, useEffect } from 'react';
import {
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineMenu
} from 'react-icons/ai';
import SideBar from './sideBar';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [sideBarVisible, setSideBarVisible] = useState(false);

  const handleToggleSidebar = () => {
    setSideBarVisible(prevState => !prevState);
  };

  useEffect(() => {
    document.body.style.overflow = sideBarVisible ? 'hidden' : 'auto';
  }, [sideBarVisible]);

  return (
    <div>
      <nav className='flex items-center justify-between bg-gray-100 p-2 md:p-3'>
        {/* 
      flex: Flexbox düzenini aktif eder, içeriklerin yatay olarak hizalanmasını sağlar.
      items-center: Flexbox içerisindeki elemanların dikey eksende ortalanmasını sağlar.
      justify-between: İçeriklerin iki uçta (sol ve sağ) hizalanmasını sağlar.
      bg-gray-100: Arka plan rengini açık gri yapar.
      p-2: Küçük ekranlar için tüm kenarlardan 0.5rem (8px) padding (boşluk) uygular.
      md:p-3: Orta ve büyük ekranlar için padding değerini 0.75rem (12px) olarak ayarlar.
      */}
        <div className='flex items-center'>
          {/* 
        flex: İçeriklerin yatay olarak sıralanmasını sağlar.
        items-center: İçeriklerin dikey eksende ortalanmasını sağlar (ikon ve logo hizalı).
        */}
          <button className='text-xl md:hidden' onClick={handleToggleSidebar}>
            {/* 
          text-xl: Butonun içindeki metin veya ikonun boyutunu 1.25rem (20px) yapar.
          md:hidden: Orta ve büyük ekranlarda bu butonu gizler, sadece küçük ekranlarda görünür.
          */}
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
            {/* 
          w-28: Küçük ekranlarda logonun genişliğini 7rem (112px) yapar.
          h-12: Küçük ekranlarda logonun yüksekliğini 3rem (48px) yapar.
          md:w-36: Orta ve büyük ekranlarda logonun genişliğini 9rem (144px) yapar.
          md:h-14: Orta ve büyük ekranlarda logonun yüksekliğini 3.5rem (56px) yapar.
          */}
          </Link>
        </div>
        <div className='flex md:space-x-8'>
          {/* 
        flex: İçeriklerin yatay olarak sıralanmasını sağlar.
        md:space-x-8: Orta ve büyük ekranlarda elemanlar arasına 2rem (32px) yatay boşluk ekler.
        */}
          <ul className='flex items-center space-x-6'>
            {/* 
          flex: Liste elemanlarının yatay olarak sıralanmasını sağlar.
          items-center: Elemanların dikey eksende ortalanmasını sağlar.
          space-x-6: Elemanlar arasına 1.5rem (24px) yatay boşluk ekler.
          */}
            <li>
              <Link
                href='/auth'
                className='flex items-center hover:text-gray-600'
              >
                {/* 
              flex: Hesap metni ve ikonun yatayda hizalanmasını sağlar.
              items-center: Metin ve ikonun dikey eksende hizalı olmasını sağlar.
              hover:text-gray-600: Fareyle üzerine gelindiğinde metnin rengini koyu gri yapar.
              */}
                <span className='hidden md:block mr-6'>Profil</span>
                {/* 
              hidden: Küçük ekranlarda bu elementi gizler.
              md:block: Orta ve büyük ekranlarda elementi gösterir.
              mr-6: Sağ tarafa 1.5rem (24px) boşluk ekler.
              */}
                <AiOutlineUser className='block md:hidden text-lg' />
                {/* 
              block: Küçük ekranlarda ikonun görünmesini sağlar.
              md:hidden: Orta ve büyük ekranlarda bu ikonu gizler.
              text-lg: İkon boyutunu 1.125rem (18px) yapar.
              */}
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='flex items-center hover:text-gray-600'
              >
                <span className='hidden md:block mr-6'>Favoriler</span>
                <AiOutlineHeart className='block md:hidden text-lg' />
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='flex items-center hover:text-gray-600'
              >
                <span className='hidden md:block mr-6'>Sepet</span>
                <AiOutlineShoppingCart className='block md:hidden text-lg' />
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
