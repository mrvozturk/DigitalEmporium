'use client';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginForm: React.FC = () => {
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (form: HTMLFormElement) => {
    const errors: { [key: string]: string } = {};
    const requiredFields = ['email', 'password'];

    requiredFields.forEach(field => {
      if (!form[field].value.trim()) {
        errors[field] = 'Bu alan zorunludur';
      }
    });

    const email = form.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Geçerli bir e-posta adresi girin';
    }

    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    validateForm(form);
  };

  return (
    <div className='loginFormContainer xs:w-[100%] sm:w-[100%]  md:w-[40%] w-[40%]  flex flex-col'>
      <h2 className='mt-2'>Giriş Yap</h2>
      <form onSubmit={handleSubmit} noValidate>
        <input
          className='w-full px-2 py-2 mt-2 mb-2 border border-black border-opacity-20 outline-none text-sm'
          type='email'
          name='email'
          placeholder='E-posta Adresi*'
        />{' '}
        {formErrors.email && (
          <p className='text-red-500 text-[0.8rem] items-center'>
            {formErrors.email}
          </p>
        )}
        <div className='password-input-container flex items-center justify-between border border-gray-300 hover:border-black px-3 py-2 mb-2 mt-2'>
          <input
            className='password-input flex-grow outline-none border-none text-sm'
            type={showLoginPassword ? 'text' : 'password'}
            name='password'
            placeholder='Şifre*'
          />
          <button
            type='button'
            onClick={() => setShowLoginPassword(prevState => !prevState)}
            className='eye-button text-xl ml-2'
          >
            {showLoginPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
        {formErrors.password && (
          <p className=' text-red-500 text-[0.8rem] items-center'>
            {formErrors.password}
          </p>
        )}
        <button className='self-start text-black text-opacity-90 cursor-pointer text-sm mt-2 mb-5 md:text-sm'>
          <span className='underline inline-block'>Şifremi Unuttum</span>
        </button>
        <button
          type='submit'
          className='loginButton w-full p-2 bg-black bg-opacity-90 text-white border border-solid font-bold cursor-pointer hover:bg-white hover:text-black'
        >
          GİRİŞ YAP
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
