'use client';
import React from 'react';
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
    <div className='fixed inset-0 bg-black bg-opacity-70 z-50 flex'>
      {/* 
        fixed: Eleman sabit pozisyondadır, ekran kaydırıldığında sabit kalır.
        inset-0: Kenar boşlukları sıfırdır, tüm ekranı kaplar.
        bg-black: Arka plan rengi siyah.
        bg-opacity-70: Arka planın opaklığı %70, hafif şeffaflık sağlar.
        z-50: Z-index değeri 50, diğer elemanların üzerinde görünür.
        flex: İçerikleri yatayda düzenlemek için flexbox kullanılır.
      */}
      <div className='w-3/4 max-w-[570px] h-full bg-white flex flex-col'>
        {/* 
          w-3/4: Genişlik ekranın %75'i kadar.
          max-w-[570px]: Maksimum genişlik 570 piksel.
          h-full: Yükseklik ekranın tamamını kaplar.
          bg-white: Arka plan rengi beyaz.
          flex flex-col: Flexbox kullanılarak içerikler dikeyde (sütun) düzenlenir.
        */}
        <div className='flex justify-between items-center bg-gray-200 p-2'>
          {/* 
            flex: İçerikler yatayda düzenlenir.
            justify-between: İçerikler yatayda iki uçta yer alır.
            items-center: İçerikler dikeyde ortalanır.
            bg-gray-200: Arka plan rengi açık gri.
            p-2: İç boşluk her taraftan 8 piksel.
          */}
          <a href='/' className='w-36 h-12'>
            {/* 
              w-36: Genişlik 144 piksel.
              h-12: Yükseklik 48 piksel.
            */}
            <Image src='/images/logo.png' width={144} height={48} alt='logo' />
          </a>
          <div className='flex gap-4 text-xl p-2'>
            {/* 
              flex: İçerikler yatayda düzenlenir.
              gap-4: Elemanlar arasında 16 piksel boşluk bırakılır.
              text-xl: Yazı boyutu büyük (1.25rem, 20px).
              p-2: İç boşluk her taraftan 8 piksel.
            */}
            <Link href='/auth'>
              <AiOutlineUser onClick={handleCloseSidebar} />
            </Link>
            <Link href='/favorites'>
              <AiOutlineHeart onClick={handleCloseSidebar} />
            </Link>
            <AiOutlineClose onClick={handleCloseSidebar} />
          </div>
        </div>
        <div className='flex flex-col items-start overflow-y-auto p-6'>
          {/* 
            flex flex-col: Flexbox ile içerikler dikeyde düzenlenir.
            items-start: İçerikler yatayda sola yaslanır.
            overflow-y-auto: Dikey taşan içerikler için kaydırma çubuğu eklenir.
            p-6: İç boşluk her taraftan 24 piksel.
          */}
          <ul className='space-y-4'>
            {/* 
              space-y-4: Her eleman arasında 16 piksel dikey boşluk bırakır.
            */}
            <li>
              <a href='#' className='text-lg'>
                {/* text-lg: Yazı boyutu büyük (1.125rem, 18px). */}
                KADIN
              </a>
            </li>
            <li>
              <a href='#' className='text-lg'>
                ERKEK
              </a>
            </li>
            <li>
              <a href='#' className='text-lg'>
                ÇOCUK
              </a>
            </li>
            <li>
              <a href='#' className='text-lg'>
                BEBEK
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div onClick={onCloseSidebar} className='w-1/4 h-full'>
        {/* 
          w-1/4: Genişlik ekranın %25'i kadar.
          h-full: Yükseklik ekranın tamamını kaplar.
        */}
      </div>
    </div>
  );
};

export default SideBar;
