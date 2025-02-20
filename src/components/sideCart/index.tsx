'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { removeFromCart } from '@/lib/features/cart/cartSlice';
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineHeart,
  AiOutlineEdit
} from 'react-icons/ai';
import Image from 'next/image';

interface SideCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideCart: React.FC<SideCartProps> = ({ isOpen, onClose }) => {
  const products = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [isCouponInputVisible, setIsCouponInputVisible] = useState(false);

  // Eğer sepet boşsa ve isOpen true olsa bile pop-up hiç açılmayacak
  if (!isOpen || products.length === 0) return null;

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
      className={`fixed right-5 w-96 h-[650px] bg-white shadow-2xl rounded-lg transform mt-1 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      } transition-all duration-300 z-50 flex flex-col`}
    >
      {/* Sepet Başlık ve Kapatma Butonu */}
      <div className='flex items-center justify-between p-5'>
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
        {products.map(product => (
          <div className='flex items-start justify-between mb-3 pb-3 w-full'>
            {/* Ürün Görseli */}
            <Image
              src={product.src}
              alt={product.title}
              width={80}
              height={80}
              className='object-contain'
            />

            {/* Ürün Bilgileri ve Butonlar */}
            <div className='flex-1 flex flex-col justify-between px-3'>
              <div>
                <h3 className='text-sm  mb-1'>{product.title}</h3>
                <p className='text-xs font-bold mb-2'>{product.price} </p>
                <p className='text-xs text-gray-500'>1 adet | M | Orta gri</p>
              </div>

              <div className='flex justify-end space-x-3 mt-4'>
                <button className='w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-200'>
                  <AiOutlineHeart size={18} />
                </button>
                <button className='w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-200'>
                  <AiOutlineEdit size={18} />
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className='w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-200 text-black-600'
                >
                  <AiOutlineDelete size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Kampanya Kodu Alanı */}
        <div className='flex justify-between items-center border-b border-gray-200 py-3 '>
          <p className='text-sm'>Kampanya kodu</p>
          <button
            className='text-black-600 text-xs font-bold'
            onClick={() => setIsCouponInputVisible(!isCouponInputVisible)}
          >
            {isCouponInputVisible ? 'Kapat' : 'Ekle'}
          </button>
        </div>

        {isCouponInputVisible && (
          <input
            type='text'
            className='w-full border px-3 py-2 mt-2 rounded-md text-sm'
            placeholder='Kodu gir'
          />
        )}
      </div>

      {/* Sipariş Bölümü */}
      <div className='p-5  bg-white'>
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
