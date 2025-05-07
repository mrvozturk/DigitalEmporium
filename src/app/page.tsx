import {
  QuandrupleBanners,
  QuandrupleBannerWithoutAnimation
} from '@/components';

export default function IndexPage() {
  return (
    <div className='rootContainer'>
      <QuandrupleBanners />
      <QuandrupleBannerWithoutAnimation />
    </div>
  );
}

