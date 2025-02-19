'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { removeFromCart } from '@/lib/features/cart/cartSlice';
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import Image from 'next/image';

interface SideCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideCart: React.FC<SideCartProps> = ({ isOpen, onClose }) => {
  const products = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [isCouponInputVisible, setIsCouponInputVisible] = useState(false);

  // Toplam fiyat hesaplama
  const total = products.reduce((acc, item) => {
    const cleanedPrice = item.price
      .replace(/[^\d,]/g, '')
      .replace(/\./g, '') // Binlik ayraçlarını sil (58.999,99 → 58999,99)
      .replace(',', '.'); // Ondalık ayracını düzelt (58999,99 → 58999.99)
    return acc + parseFloat(cleanedPrice) * item.quantity;
  }, 0);

  return (
    <div
      className={`fixed  right-5 w-96 h-[650px] bg-white shadow-2xl rounded-lg transform  mt-1 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      } transition-all duration-300 z-50 flex flex-col`}
    >
      {/* Sepet Başlık ve Kapatma Butonu */}
      <div className='flex items-center justify-between p-5 '>
        <h2 className='text-lg font-bold'>Sepet ({products.length})</h2>
        <button onClick={onClose} className='text-gray-600 hover:text-black'>
          <AiOutlineClose size={24} />
        </button>
      </div>

      {/* Ücretsiz Kargo Bilgisi */}
      <div className='flex flex-col items-center text-center px-6 py-3'>
        <div className='border-t border-b border-gray-200 w-full flex flex-col items-center py-3'>
          <p className='text-sm font-bold text-green-700'>
            ÜCRETSİZ STANDART GÖNDERİ!
          </p>
          <p className='text-xs text-black'>
            Adrese ücretsiz standart gönderi fırsatı elde ettin
          </p>
        </div>
      </div>

      {/* Sepet Ürünleri */}
      <div className='p-5 overflow-y-auto flex-1 max-h-[400px]'>
        {products.length === 0 ? (
          <p className='text-center text-gray-500 text-lg'>Sepetiniz boş.</p>
        ) : (
          products.map(product => (
            <div
              key={product.id}
              className='flex items-start justify-between mb-3  pb-3'
            >
              <Image
                src={product.src}
                alt={product.title}
                width={80}
                height={80}
                className='object-contain'
              />
              <div className='flex-1 px-3'>
                <p className='text-sm font-semibold mb-2'>{product.price}</p>
                <h3 className=' text-sm text-base mb-1'>{product.title}</h3>
                <p className='text-sm text-gray-500'>36</p>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(product.id))}
                className='text-black-600 hover:text-red-600'
              >
                <AiOutlineDelete size={20} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Sipariş Bölümü */}
      <div className='p-5 border-t bg-white'>
        <div className='flex justify-between text-base mb-3'>
          <span>Alt toplam ({products.length} ürün)</span>
          <span>
            {total.toLocaleString('tr-TR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
            TL
          </span>
        </div>
        <div className=' text-sm flex justify-between text-base mb-3'>
          <span>Kargo ücreti</span>
          <span className='text-sm text-green-600 font-semibold'>ÜCRETSİZ</span>
        </div>
        <div className='flex justify-between text-sm font-bold mb-3'>
          <span>Toplam (KDV dahil)</span>
          <span>
            {total.toLocaleString('tr-TR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
            TL
          </span>
        </div>
        <button className='w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 text-center font-semibold text-lg'>
          SİPARİŞİ İŞLEME AL
        </button>
      </div>
    </div>
  );
};

export default SideCart;
