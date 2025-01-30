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
      <div className='p-6 flex flex-col items-center text-center'>
        <AiOutlineShopping className='text-5xl mb-4' />
        <h2 className='text-xl font-bold mb-2'>Sepetiniz Boş</h2>
        <p className='mb-6 text-xs'>
          Alışverişe başlayın ve yeni gelen ürünlerimize göz atın.
        </p>

        <section className='grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6'>
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

        <div className='mt-10 p-6 w-full flex items-center justify-between'>
          <div className='text-left'>
            <h3 className='text-lg font-bold text-black'>
              İLK SİPARİŞE ÖZEL TÜM ÜRÜNLERDE{' '}
              <span className='text-red-600'>KARGO BEDAVA</span> <br />+ YENİ
              SEZONDA <span className='text-red-600'>%10 İNDİRİM!</span>
            </h3>
            <p className='text-sm text-gray-600 mt-2'>
              Kampanyalar 28.02.2025 saat 23:59 kadar geçerlidir.
            </p>
          </div>

          <Image
            src='/images/kampanya-banner.png'
            alt='Kampanya Banner'
            width={200}
            height={100}
            className='rounded-lg'
          />
        </div>
      </div>
      <section className=' border-t  w-full '>
        <div className=' text-center p-8 px-10 md:px-10 xs:px-4 '>
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
              el: '.custom-pagination'
            }}
            breakpoints={{
              340: { slidesPerView: 2 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 3 }
            }}
            className='swiper-container  '
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <div className='flex items-center '>
                  <div className='flex flex-col items-center  font-bold  w-full mx-auto  '>
                    {feature.icon}
                    <p className='text-xs whitespace-nowrap  xs:text-xxs '>
                      {feature.text}
                    </p>
                  </div>
                  {index < features.length - 1 && (
                    <div className='h-10 w-px bg-black mx-10 flex   '>
                      <div className='h-full w-px '></div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Özel Pagination Container */}
          <div className='custom-pagination mt-4 !relative !h-6 ' />
        </div>
      </section>
    </div>
  );
};

export default CartPage;
