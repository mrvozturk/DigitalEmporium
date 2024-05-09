'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Göz simgeleri için
import styles from './index.module.css';

const AccountProcess: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showRegistrationPassword, setShowRegistrationPassword] = useState<
    boolean
  >(false);
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (type: 'registration' | 'login') => {
    if (type === 'registration') {
      setShowRegistrationPassword(!showRegistrationPassword);
    } else {
      setShowLoginPassword(!showLoginPassword);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Kayıt Ol</h2>
        <form className={styles.registrationForm}>
          <input type='email' name='email' placeholder='E-posta Adresi*' />
          <div className={styles.nameContainer}>
            <input type='text' name='firstName' placeholder='Ad*' />
            <input type='text' name='lastName' placeholder='Soyad*' />
          </div>
          <div className={styles.passwordInputContainer}>
            <input
              className={styles.passwordWrapper}
              type={showRegistrationPassword ? 'text' : 'password'}
              name='password'
              placeholder='Şifre*'
            />
            <button
              type='button'
              onClick={() => togglePasswordVisibility('registration')}
            >
              {showRegistrationPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <input
            type='tel'
            name='phoneNumber'
            placeholder='Telefon Numarası*'
          />
          <label htmlFor='birthdate'>Doğum Tarihi</label>

          <div className={styles.dateContainer}>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat='dd/MM/yyyy'
              placeholderText='dd/MM/yyyy'
              showMonthDropdown
              showYearDropdown
              dropdownMode='scroll'
              minDate={new Date(1950, 0, 1)} // 1 Ocak 1950
              maxDate={new Date(2024, 11, 31)} // 31 Aralık 2008
              scrollableMonthYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={78}
            />
          </div>
          <label htmlFor='birthdate'>Cinsiyet</label>
          <div className={styles.genderContainer}>
            <input type='radio' name='gender' value='female' />
            <label> Kadın </label>
            <input type='radio' name='gender' value='male' />
            <label> Erkek</label>
            <input type='radio' name='gender' value='other' />
            <label> Diğer</label>
          </div>

          <button type='submit'>Kayıt Ol</button>
        </form>
      </div>
      <div className={styles.loginFormContainer}>
        <h2>Giriş Yap</h2>
        <form className={styles.loginForm}>
          <input type='email' name='email' placeholder='E-posta Adresi*' />
          <div>
            <input
              type={showLoginPassword ? 'text' : 'password'}
              name='password'
              placeholder='Şifre*'
            />
            <button
              type='button'
              onClick={() => togglePasswordVisibility('login')}
            >
              {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type='submit'>Giriş Yap</button>
        </form>
      </div>
    </div>
  );
};

export default AccountProcess;
