import {
  QuandrupleBanners,
  QuandrupleBannerWithoutAnimation
} from '@/components';
import type { Metadata } from 'next';
import Link from 'next/link';

export default function IndexPage() {
  return (
    <div>
      {/* 
    <button
      style={{
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px',
        fontSize: '20px',
        margin: '10px'
      }}
    >
      <Link href='/examplePage'>REDIRECT PAGE TO EXAMPLE FOR REDUX</Link>
    </button>
  */}
      <QuandrupleBanners />
      <QuandrupleBannerWithoutAnimation />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Redux Toolkit'
};
