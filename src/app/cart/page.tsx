import { AiOutlineShopping } from 'react-icons/ai';
import Image from 'next/image';
import FeatureSwiper from './../../components/swiper'; 

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

        <div className='mt-12 xs:mt-6 xs:mb-6 sm:mt-2 md:mt-6 md:mb-6 lg:mt-10 lg:mb-10 xl:mt-20 xl:mb-20 xs:p-0 sm:p-0 md:p-0 lg:p-0 p-6 w-full flex items-center justify-center'>
          <Image
            src='/images/kampanya5.jpg'
            alt='KAMPANYALAR'
            width={1300}
            height={700}
            priority
            className='object-cover w-full max-h-[700px] xs:max-h-[200px] sm:max-h-[250px] md:max-h-[300px] lg:max-h-[400px] xl:max-h-[550px] object-center'
          />
        </div>
      </div>

      <FeatureSwiper />
    </div>
  );
};

export default CartPage;
