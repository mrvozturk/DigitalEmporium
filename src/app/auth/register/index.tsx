'use client';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, forwardRef, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import InputMask from 'react-input-mask';
import {
  AiOutlineCalendar,
  AiOutlineEye,
  AiOutlineEyeInvisible
} from 'react-icons/ai';
import { tr } from 'date-fns/locale';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setRegisterData } from '../../../lib/features/user/registerSlice';

registerLocale('tr', tr);

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    const form = e.target as HTMLFormElement;
    const requiredFields = [
      'email',
      'firstName',
      'lastName',
      'password',
      'phoneNumber',
      'gender'
    ];

    requiredFields.forEach(field => {
      if (!form[field].value.trim()) {
        errors[field] = 'Bu alan zorunludur';
      }
    });

    const email = form.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = 'Bu alan zorunludur';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Geçerli bir e-posta adresi girin';
    }

    if (!selectedDate) errors.birthdate = 'Bu alan zorunludur';

    const password = form.password.value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*.?&])[A-Za-z\d@$!%*.?&]{8,}$/;
    if (!password) {
      errors.password = 'Bu alan zorunludur';
    } else if (!passwordRegex.test(password)) {
      errors.password = 'Karakterler kurallara göre girilmelidir';
      setShowPasswordCriteria(true);
    } else {
      setShowPasswordCriteria(false);
    }

    const phoneNumber = form.phoneNumber.value.replace(/\D/g, '');
    if (!phoneNumber) {
      errors.phoneNumber = 'Bu alan zorunludur';
    } else if (phoneNumber.length < 11) {
      errors.phoneNumber = 'Bu alan en az 11 karakter olmalıdır';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const formData = {
        email: form.email.value,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        password,
        phoneNumber: form.phoneNumber.value,
        gender: form.gender.value,
        birthdate: selectedDate?.toLocaleDateString('tr-TR') ?? ''
      };

      dispatch(setRegisterData(formData));
      router.push('/profile');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*.?&]/.test(password)
    };
    setPasswordCriteria(criteria);
    setIsPasswordValid(Object.values(criteria).every(Boolean));
    if (!isPasswordValid) {
      setShowPasswordCriteria(true);
    }
  };

  const handleNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(
      /[^a-zA-ZığüşöçİĞÜŞÖÇ\s]/g,
      ''
    );
  };

  const handlePasswordFocus = () => {
    if (!isPasswordValid) {
      setShowPasswordCriteria(true);
    }
  };
  const CustomDateInput = forwardRef<
    HTMLInputElement,
    { value?: string; onClick?: () => void; placeholder?: string }
  >(({ value, onClick, placeholder }, ref) => (
    <button
      className='flex border border-gray-300 p-2 my-2 hover:border-gray-900'
      onClick={onClick}
      type='button'
    >
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        className='w-[calc(100%-20px)] p-0 border-0 outline-none text-xs cursor-pointer'
        inputMode='text'
        readOnly
      />
      <AiOutlineCalendar className='text-[16px]' />
    </button>
  ));

  return (
    <div className='w-2/5 xs:w-[100%] sm:w-[100%] md:w-[40%]'>
      <h2 className='mt-2'>Kayıt Ol</h2>
      <form className='flex flex-col' onSubmit={validateForm} noValidate>
        <input
          type='email'
          name='email'
          placeholder='E-posta Adresi*'
          className='w-full p-2 border border-gray-300 outline-none text-xs mb-2 mt-2 hover:border-gray-600'
        />
        {formErrors.email && (
          <p className='text-red-500 text-xs'>{formErrors.email}</p>
        )}

        <div className='flex justify-between'>
          <div className='flex flex-col w-[calc(50%-5px)]'>
            <input
              type='text'
              name='firstName'
              placeholder='Ad*'
              onInput={handleNameInput}
              className='w-full p-2 border border-gray-300 outline-none text-xs mb-2 mt-2 hover:border-gray-600'
            />
            {formErrors.firstName && (
              <p className='text-red-500 text-xs'>{formErrors.firstName}</p>
            )}
          </div>
          <div className='flex flex-col w-[calc(50%-5px)]'>
            <input
              type='text'
              name='lastName'
              placeholder='Soyad*'
              onInput={handleNameInput}
              className='w-full p-2 border border-gray-300 outline-none text-xs mb-2 mt-2 hover:border-gray-600'
            />
            {formErrors.lastName && (
              <p className='text-red-500 text-xs'>{formErrors.lastName}</p>
            )}
          </div>
        </div>

        <div className='flex items-center justify-between border border-gray-300 p-2 my-2 hover:border-gray-900'>
          <input
            className='w-[calc(100%-30px)] outline-none border-none text-xs'
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Şifre*'
            onFocus={handlePasswordFocus}
            onChange={handlePasswordChange}
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='text-gray-700'
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        {formErrors.password && (
          <p className='text-red-500 text-xs'>{formErrors.password}</p>
        )}

        {showPasswordCriteria && !isPasswordValid && (
          <div>
            <ul className='list-none p-0 text-xs m-0'>
              <li
                className={
                  passwordCriteria.length ? 'text-green-500' : 'text-red-500'
                }
              >
                En az 8 karakter uzunluğunda olmalıdır
              </li>
              <li
                className={
                  passwordCriteria.uppercase ? 'text-green-500' : 'text-red-500'
                }
              >
                Parolanız en az 1 büyük harf içermelidir
              </li>
              <li
                className={
                  passwordCriteria.lowercase ? 'text-green-500' : 'text-red-500'
                }
              >
                Parolanız en az 1 küçük harf içermelidir
              </li>
              <li
                className={
                  passwordCriteria.number ? 'text-green-500' : 'text-red-500'
                }
              >
                Parolanız en az 1 numara içermelidir
              </li>
              <li
                className={
                  passwordCriteria.specialChar
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                Parolanız en az 1 özel karakter içermelidir
              </li>
            </ul>
          </div>
        )}

        <InputMask
          mask='0 (599) 999 99 99'
          maskChar='_'
          alwaysShowMask={true}
          type='tel'
          name='phoneNumber'
          placeholder='Telefon Numarası*'
          className='w-full p-2 border border-gray-300 outline-none text-xs mb-2 mt-2 hover:border-gray-600'
        />

        {formErrors.phoneNumber && (
          <p className='text-red-500 text-xs'>{formErrors.phoneNumber}</p>
        )}

        <div className='flex flex-col md:flex-row md:justify-between text-base gap-2'>
          <div className='xs:w-full md:w-1/2 w-full flex flex-col'>
            <label htmlFor='birthdate'>Doğum Tarihi</label>
            <DatePicker
              customInput={<CustomDateInput />}
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat='dd/MM/yyyy'
              placeholderText='gg/aa/yyyy'
              showMonthDropdown
              showYearDropdown
              dropdownMode='scroll'
              minDate={new Date(1950, 0, 1)}
              maxDate={new Date(2024, 11, 31)}
              scrollableMonthYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={78}
              locale='tr'
            />
            {formErrors.birthdate && (
              <p className='text-red-500 text-xs'>{formErrors.birthdate}</p>
            )}
          </div>
          <div className='w-1/2 flex flex-col'>
            <label>Cinsiyet</label>
            <div className='flex gap-2 text-xs mt-4'>
              <input
                type='radio'
                name='gender'
                value='kadın'
                className='w-4 h-4'
              />
              <label> Kadın </label>
              <input
                type='radio'
                name='gender'
                value='erkek'
                className='w-4 h-4'
              />
              <label> Erkek </label>
            </div>
            {formErrors.gender && (
              <p
                className={`text-[0.72rem] flex flex-col mt-4 mb-0 ${
                  formErrors.isGreen ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {formErrors.gender}
              </p>
            )}
          </div>
        </div>

        <button
          type='submit'
          className='w-full p-2 bg-black text-white border font-bold cursor-pointer mt-2 hover:bg-white hover:text-black'
        >
          KAYIT OL
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
