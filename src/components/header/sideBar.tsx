'use client';
import React from 'react';
import { AiOutlineUser, AiOutlineHeart, AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
interface SideBarProps {
  onCloseSidebar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onCloseSidebar }) => {
  const { data: session } = useSession();
  const handleCloseSidebar = () => {
    onCloseSidebar();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 z-50 flex'>
      <div className='w-3/4 max-w-[570px] h-full bg-white flex flex-col'>
        <div className='flex justify-between items-center bg-gray-200 px-2 py-3'>
          <a href='/' className='flex-shrink-0'>
            <Image src='/images/logo.png' width={125} height={50} alt='logo' />
          </a>

          <div className='flex gap-3 text-lg items-center align-center'>
            <Link href={session ? 'profile' : '/auth'}>
              <AiOutlineUser
                onClick={handleCloseSidebar}
                className='cursor-pointer'
              />
            </Link>
            <Link href='/favorites'>
              <AiOutlineHeart
                onClick={handleCloseSidebar}
                className='cursor-pointer'
              />
            </Link>
            <AiOutlineClose
              onClick={handleCloseSidebar}
              className='cursor-pointer'
            />
          </div>
        </div>

        <div className='flex flex-col items-start overflow-y-auto p-6'>
          <ul className='space-y-4'>
            <li>
              <a href='#' className='text-md font-semibold'>
                KADIN
              </a>
            </li>
            <li>
              <a href='#' className='text-md font-semibold'>
                ERKEK
              </a>
            </li>
            <li>
              <a href='#' className='text-md font-semibold'>
                ÇOCUK
              </a>
            </li>
            <li>
              <a href='#' className='text-md font-semibold'>
                BEBEK
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Clickable background to close sidebar */}
      <button onClick={onCloseSidebar} className='w-1/4 h-full'></button>
    </div>
  );
};

export default SideBar;
