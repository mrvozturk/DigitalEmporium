import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import CouponInput from '../../couponInput';
import { calculateTotal } from '@/lib/utils/calculateTotal';

const CartSummary = () => {
  const products = useSelector((state: RootState) => state.cart.items);
  const total = calculateTotal(products);

  return (
    <div className='w-full lg:w-1/3'>
      <h3 className='py-2 flex text-lg font-semibold border-b border-gray-300'>
        Sipariş Özeti
      </h3>
      <div className='mt-3 text-xs'>
        <div className='flex justify-between'>
          <span>Ürünlerin Toplamı ({products.length} ürün)</span>
          <span>
            {total.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className='flex justify-between text-red-500 mt-2'>
          <span>Yeni Sezon Ürünlerde Kargo Bedava</span>
          <span>-$0.00</span>
        </div>
        <div className='flex justify-between text-red-500 mt-2'>
          <span>Kargo Bedava</span>
          <span>-$0.00</span>
        </div>
        <div className='flex justify-between text-black-500 mt-2'>
          <span>Toplam İndirim</span>
          <span>-$0.00</span>
        </div>

        {/* Kupon Girişi */}
        <CouponInput />

        <div className='flex justify-between text-lg font-semibold border-t border-gray-300 py-2 border-b mb-2'>
          <span>Toplam</span>
          <span>
            {total.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}
          </span>
        </div>

        <button className='mt-2 w-full h-10 text-sm bg-black text-white font-semibold'>
          SİPARİŞİ TAMAMLA
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
