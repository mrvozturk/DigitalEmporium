'use client';

import {
  AiOutlineSwap,
  AiOutlineCreditCard,
  AiOutlineCheckCircle,
  AiOutlineUndo
} from 'react-icons/ai';
import { MdStorefront, MdDeliveryDining } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const features = [
  {
    id: 'digital-emporium',
    icon: <MdStorefront className='text-3xl mb-2' />,
    text: 'Digital Emporium'
  },
  {
    id: 'store-pickup',
    icon: <MdStorefront className='text-3xl mb-2' />,
    text: 'Mağazadan Gel-Al'
  },
  {
    id: 'exchange-return',
    icon: <AiOutlineSwap className='text-3xl mb-2' />,
    text: 'Mağazada Değişim & İade'
  },
  {
    id: 'cash-on-delivery',
    icon: <AiOutlineCreditCard className='text-3xl mb-2' />,
    text: 'Kapıda Ödeme'
  },
  {
    id: 'fast-delivery',
    icon: <MdDeliveryDining className='text-3xl mb-2' />,
    text: 'Bi Tıkla Kapında'
  },
  {
    id: 'secure-shopping',
    icon: <AiOutlineCheckCircle className='text-3xl mb-2' />,
    text: 'Güvenli Alışveriş'
  },
  {
    id: 'free-return',
    icon: <AiOutlineUndo className='text-3xl mb-2' />,
    text: 'Ücretsiz İade'
  }
];

const FeatureSwiper: React.FC = () => {
  return (
    <section className='border-t w-full'>
      <div className='w-full text-center p-8 px-10 md:px-10 xs:px-4'>
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          breakpoints={{
            340: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 7 }
          }}
          className='swiper-container'
        >
          {features.map(feature => (
            <SwiperSlide key={feature.id}>
              <div className='flex items-center justify-center gap-4 xs:gap-0 w-full relative'>
                <div className='flex flex-col items-center text-center font-bold w-full px-4 py-2'>
                  {feature.icon}
                  <p className='text-xs whitespace-nowrap xs:text-2xs sm:text-md md:text-xs'>
                    {feature.text}
                  </p>
                </div>
                {feature.id !== features[features.length - 1].id && (
                  <div className='right-0 transform translate-x-[10px] w-[1px] bg-black xs:block h-10' />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='custom-pagination mt-4 !relative !h-6' />
      </div>
    </section>
  );
};

export default FeatureSwiper;
