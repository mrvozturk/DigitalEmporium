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
import { useState, useRef, useEffect } from 'react';

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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const slideWidth = scrollRef.current.scrollWidth / features.length;
        setActiveIndex(Math.round(scrollLeft / slideWidth));
      }
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className='p-6 flex flex-col items-center text-center'>
      {/* Sepet Boş İçeriği */}
      <AiOutlineShopping className='text-5xl mb-4' />
      <h2 className='text-xl font-bold mb-2'>Sepetiniz Boş</h2>
      <p className='mb-6 text-xs'>
        Alışverişe başlayın ve yeni gelen ürünlerimize göz atın.
      </p>

      {/* Kategori Butonları */}
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

      {/* Kampanya Alanı */}
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

      {/* Özellikler Alanı */}
      <section className='bg-white border-t border-gray-200 py-6 mt-10 w-full'>
        <div className='max-w-full mx-auto px-10 xs:px-1 '>
          <div
            ref={scrollRef}
            className='flex w-full overflow-x-auto flex-nowrap scrollbar-hide items-center justify-between'
          >
            {features.map((feature, index) => (
              <div key={index} className='flex items-center justify-center'>
                {/* İkon ve Metin */}
                <div className='flex flex-col items-center px-4 xs:px-4 text-center font-bold '>
                  {feature.icon}
                  <p className='text-xs'>{feature.text}</p>
                </div>

                {/* Dikey Çizgi (Son öğeden sonra eklenmez) */}
                {index < features.length - 1 && (
                  <div className='h-10 w-px bg-black mx-8 align-center'></div>
                )}
              </div>
            ))}
          </div>

          {/* Sayfa Noktaları */}
          <div className='flex justify-center items-center py-4 w-full xl:hidden mb-3'>
            {features.map((_, index) => (
              <span
                key={index}
                className={`inline-block h-2.5 w-2.5 rounded-full mx-1 border border-[#000] ${
                  activeIndex === index ? 'bg-[#000] border-none' : 'bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
