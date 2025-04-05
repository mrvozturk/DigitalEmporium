'use client';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

/**
 * Giriş Formu Bileşeni
 *
 * Kullanıcı kimlik doğrulama işlemlerini yönetir:
 * - Form validasyonu
 * - Giriş işlemi (NextAuth ile)
 * - Hata mesajlarını gösterme
 * - Giriş başarılı olduğunda yönlendirme
 */
const LoginForm: React.FC = () => {
  const router = useRouter();
  // Şifre görünürlüğünü kontrol eden state
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);
  // Form hata mesajlarını tutan state
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  // Giriş hatalarını tutan state
  const [loginError, setLoginError] = useState<string | null>(null);

  /**
   * Form validasyonu
   * - Gerekli alanların doldurulduğunu kontrol eder
   * - E-posta formatını doğrular
   */
  const validateForm = (form: HTMLFormElement) => {
    const errors: { [key: string]: string } = {};
    const requiredFields = ['email', 'password'];

    // Zorunlu alanları kontrol et
    requiredFields.forEach(field => {
      if (!form[field].value.trim()) {
        errors[field] = 'Bu alan zorunludur';
      }
    });

    // E-posta formatını kontrol et
    const email = form.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errors.email = 'Geçerli bir e-posta adresi girin';
    }

    setFormErrors(errors);
    return errors;
  };

  /**
   * Form gönderildiğinde çalışan fonksiyon
   * - Form validasyonu yapar
   * - NextAuth ile giriş işlemini başlatır
   * - Giriş başarılıysa profil sayfasına yönlendirir
   * - Hata durumunda kullanıcıya bilgi verir
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errors = validateForm(form);

    // Validasyon hataları varsa işlemi durdur
    if (Object.keys(errors).length > 0) {
      setLoginError(null);
      return;
    }

    // Önceki hata mesajlarını temizle
    setLoginError(null);

    try {
      // NextAuth ile giriş işlemi
      const response = await signIn('login', {
        redirect: false, // Otomatik yönlendirmeyi devre dışı bırak
        email: form.email.value,
        password: form.password.value
      });

      if (response?.error) {
        // Hata mesajını işle ve göster
        try {
          // API'den dönen hata JSON formatındaysa parse et
          const errorData = JSON.parse(response.error);
          setLoginError(errorData.message || 'Geçersiz e-posta veya şifre');
        } catch {
          // JSON parse hatası olursa genel hata mesajı göster
          setLoginError('Geçersiz e-posta veya şifre');
        }
        console.error('Giriş hatası:', response.error);
      } else {
        // Giriş başarılı, profil sayfasına yönlendir
        console.log('Başarıyla giriş yapıldı');
        router.push('/profile');
      }
    } catch (error) {
      // Beklenmeyen hatalar için
      console.error('Giriş işlemi sırasında bir hata oluştu:', error);
      setLoginError(
        'Giriş sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
      );
    }
  };

  // Form bileşeni render etme
  return (
    <div className='loginFormContainer xs:w-[100%] sm:w-[100%] md:w-[100%] lg:w-[40%] xl:w-[40%] xs:p-0 sm:p-0 md:p-4 lg:p-4 xl:p-4 w-[40%] flex flex-col'>
      <h2 className='mt-2'>Giriş Yap</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* E-posta giriş alanı */}
        <input
          className='w-full px-2 py-2 mt-2 mb-2 border border-black border-opacity-20 outline-none text-sm'
          type='email'
          name='email'
          placeholder='E-posta Adresi*'
        />
        {formErrors.email && (
          <p className='text-red-500 text-[0.8rem] items-center'>
            {formErrors.email}
          </p>
        )}

        {/* Şifre giriş alanı */}
        <div className='password-input-container flex items-center justify-between border border-gray-300 hover:border-black px-3 py-2 mb-2 mt-2'>
          <input
            className='password-input flex-grow outline-none border-none text-sm'
            type={showLoginPassword ? 'text' : 'password'}
            name='password'
            placeholder='Şifre*'
          />
          {/* Şifre göster/gizle butonu */}
          <button
            type='button'
            onClick={() => setShowLoginPassword(prevState => !prevState)}
            className='eye-button text-xl ml-2'
          >
            {showLoginPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
        {formErrors.password && (
          <p className='text-red-500 text-[0.8rem] items-center'>
            {formErrors.password}
          </p>
        )}

        {/* Giriş hatası mesajı */}
        {loginError && (
          <p className='text-red-500 text-[0.8rem] items-center'>
            {loginError}
          </p>
        )}

        {/* Şifremi unuttum butonu */}
        <button className='self-start text-black text-opacity-90 cursor-pointer text-sm mt-2 mb-5 md:text-sm'>
          <span className='underline inline-block'>Şifremi Unuttum</span>
        </button>

        {/* Giriş yap butonu */}
        <button
          type='submit'
          className='loginButton w-full p-2 bg-black bg-opacity-90 text-white border border-transparent border-solid font-bold cursor-pointer hover:bg-white hover:text-black hover:border-black'
        >
          GİRİŞ YAP
        </button>
      </form>
    </div>
  );
};

export default LoginForm;