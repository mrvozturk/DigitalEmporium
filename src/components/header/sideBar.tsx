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
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex">
      <div className="w-3/4 max-w-[570px] h-full bg-white flex flex-col">
        <div className="flex justify-between items-center bg-gray-200 p-2">
          <a href="/" className="w-36 h-12">
            <Image src="/images/logo.png" width={500} height={500} alt="logo" />
          </a>
          <div className="flex gap-4 text-xl p-2">
            <Link href="/auth">
              <AiOutlineUser onClick={handleCloseSidebar} />
            </Link>
            <Link href="/favorites">
              <AiOutlineHeart onClick={handleCloseSidebar} />
            </Link>
            <AiOutlineClose onClick={handleCloseSidebar} />
          </div>
        </div>
        <div className="flex flex-col items-start overflow-y-auto p-6">
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-lg">KADIN</a>
            </li>
            <li>
              <a href="#" className="text-lg">ERKEK</a>
            </li>
            <li>
              <a href="#" className="text-lg">ÇOCUK</a>
            </li>
            <li>
              <a href="#" className="text-lg">BEBEK</a>
            </li>
          </ul>
        </div>
      </div>
      <div onClick={onCloseSidebar} className="w-1/4 h-full"></div>
    </div>
  );
};

export default SideBar;
