'use client';
import {
  AiOutlineSwap,
  AiOutlineCreditCard,
  AiOutlineCheckCircle,
  AiOutlineUndo,
  AiOutlineShopping
} from 'react-icons/ai';
import { MdStorefront, MdDeliveryDining } from 'react-icons/md';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const features = [
  {
    icon: <MdStorefront className='text-3xl mb-2' />,
    text: 'Digital Emporium'
  },
  {
    icon: <MdStorefront className='text-3xl mb-2' />,
    text: 'Mağazadan Gel-Al'
  },
  {
    icon: <AiOutlineSwap className='text-3xl mb-2' />,
    text: 'Mağazada Değişim & İade'
  },
  {
    icon: <AiOutlineCreditCard className='text-3xl mb-2' />,
    text: 'Kapıda Ödeme'
  },
  {
    icon: <MdDeliveryDining className='text-3xl mb-2' />,
    text: 'Bi Tıkla Kapında'
  },
  {
    icon: <AiOutlineCheckCircle className='text-3xl mb-2' />,
    text: 'Güvenli Alışveriş'
  },
  { icon: <AiOutlineUndo className='text-3xl mb-2' />, text: 'Ücretsiz İade' }
];

const CartPage: React.FC = () => {
  return (
    <div>
      <div className='xs:p-0 sm:p-0 md:p-0 lg:p-0 mt-20 xs:mt-10 p-6 flex flex-col items-center text-center'>
        <AiOutlineShopping className='text-5xl mb-4' />
        <h2 className='text-xl font-bold mb-2'>Sepetiniz Boş</h2>
        <p className='mb-6 text-xs'>
          Alışverişe başlayın ve yeni gelen ürünlerimize göz atın.
        </p>

        <section className='grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-2'>
          {['Kadın', 'Erkek', 'Çocuk', 'Bebek'].map(category => (
            <a
              key={category}
              href='#'
              className='text-xs font-bold border border-black px-6 py-2 hover:bg-black hover:text-white transition text-center'
            >
              {category}
            </a>
          ))}
        </section>
        <div className='mt-12 xs:mt-2 sm:mt-2 md:mt-6 md:mb-6 lg:mt-10 lg:mb-10 xl:mt-20 xl:mb-20 xs:p-0 sm:p-0 md:p-0 lg:p-0 p-6 w-full flex items-center justify-center'>
          <Image
            src='/images/kampanya13.png'
            alt='KAMPANYALAR'
            width={1300}
            height={700}
            priority
            className='object-cover w-full max-h-[700px] xs:max-h-[200px] sm:max-h-[250px] md:max-h-[300px] lg:max-h-[400px] xl:max-h-[550px]  object-center  '
          />
        </div>
      </div>
      <section className=' border-t  w-full'>
        <div className=' w-full text-center p-8 px-10 md:px-10 xs:px-4 '>
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
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <div className='flex items-center justify-center gap-4 xs:gap-0 w-full relative'>
                  {/* İçerik */}
                  <div className='flex flex-col items-center text-center font-bold w-full px-4 py-2'>
                    {feature.icon}
                    <p className='text-xs whitespace-nowrap xs:text-xxs'>
                      {feature.text}
                    </p>
                  </div>
                  {index < features.length - 1 && (
                  
                      <div className=' right-0 transform translate-x-[10px] w-[1px] bg-black xs:block h-10' />
                  
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='custom-pagination mt-4 !relative !h-6 ' />
        </div>
      </section>
    </div>
  );
};

export default CartPage;
