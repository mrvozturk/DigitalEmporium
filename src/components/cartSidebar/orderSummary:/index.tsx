import React from 'react';

interface CartSummaryProps {
  total: number;
  count: number;
}

const CartOrderSummary: React.FC<CartSummaryProps> = ({ total, count }) => {
  return (
    <div className='p-5 border-t bg-white'>
      <div className='flex justify-between text-base mb-3 text-xs'>
        <span>Alt toplam ({count} ürün)</span>
        <span>{total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL</span>
      </div>
      <div className='flex justify-between text-base mb-3 text-xs'>
        <span>Kargo ücreti</span>
        <span className='text-red-600 font-semibold'>ÜCRETSİZ</span>
      </div>
      <div className='flex justify-between text-sm font-semibold mb-3'>
        <span>
          Toplam <span className='text-gray-400 font-normal text-xs'>(KDV dahil)</span>
        </span>
        <span>{total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL</span>
      </div>
      <button className='w-full text-sm bg-black text-white py-3 rounded-md hover:bg-white hover:text-black text-center font-semibold border border-black'>
        SİPARİŞİ İŞLEME AL
      </button>
    </div>
  );
};

export default CartOrderSummary;
