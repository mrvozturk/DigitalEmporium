'use client';
import React from 'react';
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
import CouponInput from '../couponInput';

interface SideCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideCart: React.FC<SideCartProps> = ({ isOpen, onClose }) => {
  const products = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  // Ürün fiyatları hesaplama
  const total = products.reduce((acc, item) => {
    const cleanedPrice = item.price
      .replace(/[^\d,]/g, '')
      .replace(/\./g, '')
      .replace(',', '.');
    return acc + parseFloat(cleanedPrice) * item.quantity;
  }, 0);

  return (
    <div
      className={`fixed right-5 w-96 h-[650px] bg-white shadow-2xl rounded-lg transform mt-1 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      } transition-all duration-300 z-50 flex flex-col`}
    >
      {/* Sepet Başlık ve Kapatma Butonu */}
      <div className='flex items-center justify-between p-5 border-b'>
        <h2 className='text-lg font-bold'>Sepet ({products.length})</h2>
        <button onClick={onClose} className='hover:text-black'>
          <AiOutlineClose size={24} />
        </button>
      </div>

      {products.length === 0 ? (
        <div className='flex items-center justify-center flex-1 text-gray-500'>
          Sepetiniz boş
        </div>
      ) : (
        <>
          {/* Ücretsiz Kargo Bilgisi */}
          <div className='px-6 py-3 border-b text-center'>
            <p className='text-sm font-bold text-red-600'>
              ÜCRETSİZ STANDART GÖNDERİ!
            </p>
            <p className='text-xs text-black'>
              Adrese ücretsiz standart gönderi fırsatı elde ettin
            </p>
          </div>

          {/* Sepet Ürünleri */}
          <div className='p-5 overflow-y-auto flex-1 max-h-[350px]'>
            {products.map(product => (
              <div key={product.id} className='flex mb-3 pb-3 border-b'>
                <Image
                  src={product.src}
                  alt={product.title}
                  width={80}
                  height={120}
                  className='object-contain border border-gray-300 rounded-md shadow-md p-1 w-[80px] h-[120px]'
                />
                <div className='flex-1 flex flex-col justify-between px-3'>
                  <div>
                    <h3 className='text-sm mb-1'>{product.title}</h3>
                    <p className='text-xs font-bold mb-2'>{product.price}</p>
                    <p className='text-xs text-gray-500'>
                      {product.quantity} adet | M | Orta gri
                    </p>
                  </div>
                  <div className='flex justify-end space-x-3 mt-4'>
                    <button className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-200'>
                      <AiOutlineHeart size={18} />
                    </button>
                    <button className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-200'>
                      <AiOutlineEdit size={18} />
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(product.id))}
                      className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-200 text-black-600'
                    >
                      <AiOutlineDelete size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {/* Kupon Alanı */}
            <div className='text-xs'>
              <CouponInput />
            </div>
          </div>

          {/* Sipariş Bilgileri */}
          <div className='p-5 border-t bg-white'>
            <div className='flex justify-between text-base mb-3 text-xs'>
              <span>Alt toplam ({products.length} ürün)</span>
              <span>
                {total.toLocaleString('tr-TR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
                TL
              </span>
            </div>
            <div className='flex justify-between text-base mb-3 text-xs'>
              <span>Kargo ücreti</span>
              <span className='text-red-600 font-semibold'>ÜCRETSİZ</span>
            </div>
            <div className='flex justify-between text-sm font-bold mb-3 '>
              <span>Toplam (KDV dahil)</span>
              <span>
                {total.toLocaleString('tr-TR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
                TL
              </span>
            </div>
            <button className='w-full text-sm bg-black text-white py-3 rounded-md hover:bg-white hover:text-black text-center font-semibold border border-black'>
              SİPARİŞİ İŞLEME AL
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SideCart;
