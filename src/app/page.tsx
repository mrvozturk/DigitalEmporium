import {
  QuandrupleBanners,
  QuandrupleBannerWithoutAnimation
} from '@/components';
import type { Metadata } from 'next';

export default function IndexPage() {
  return (
    <div className='rootContainer'>
      <QuandrupleBanners />
      <QuandrupleBannerWithoutAnimation />
    </div>
  );
}

