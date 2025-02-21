import { useState } from 'react';
export default function CouponInput() {
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
    if (error && e.target.value.trim()) {
      setError('');
    }
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      setError('Bu alan zorunludur.');
      return;
    }
    if (couponCode !== 'DIGITALEMP25') {
      setError('Kupon kodu geçersizdir.');
      return;
    }
    setError('');
    console.log('Kupon kodu uygulandı:', couponCode);
  };

  return (
    <div className='flex flex-col w-full mt-3 mb-3'>
      <div className='flex border border-gray-400 w-full'>
        <input
          type='text'
          value={couponCode}
          onChange={handleInputChange}
          className='flex-1 px-2 py-2 outline-none border-none w-full'
          placeholder='Kupon kodu girin'
        />
        <button
          onClick={applyCoupon}
          className='px-4 py-2 text-black font-bold border-l border-gray-400 hover:bg-black hover:text-white '
        >
          EKLE
        </button>
       
      </div>

      {error && (
        <span className='text-red-600 text-xs mt-1 text-left '>{error}</span>
      )}

    </div>
  );
}
