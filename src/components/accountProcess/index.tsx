'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './index.module.css';

const AccountProcess: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Kayıt Ol</h2>

        <form className={styles.registrationForm}>
          <div>
            <input type='email' name='email' placeholder='E-posta Adresi*' />
          </div>
          <div className={styles.nameContainer}>
            <div>
              <input type='text' name='firstName' placeholder='Ad*' />
            </div>
            <div>
              <input type='text' name='lastName' placeholder='Soyad*' />
            </div>
          </div>
          <div>
            <input type='password' name='password' placeholder='Şifre*' />
          </div>
          <div>
            <input
              type='tel'
              name='phoneNumber'
              placeholder='Telefon Numarası*'
            />
          </div>
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
              maxDate={new Date(2008, 11, 31)} // 31 Aralık 2008
              scrollableMonthYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={58}
            />
          </div>

          {/* Cinsiyet Seçimi */}
          <div className={styles.genderContainer}>
            <div className={styles.genderName}>Cinsiyet</div>
            <input type='radio' name='gender' value='female' />
            <label> Kadın </label>
            <input type='radio' name='gender' value='male' />
            <label> Erkek</label>{' '}
          </div>
          <button type='submit'>Kayıt Ol</button>
        </form>
      </div>

      {/* Giriş Yapma Formu */}
      <div className={styles.loginFormContainer}>
        <h2>Giriş Yap</h2>
        <form className={styles.loginForm}>
          <div>
            <input type='email' name='email' placeholder='E-posta Adresi*' />
          </div>
          <div>
            <input type='password' name='password' placeholder='Şifre*' />
          </div>
          <button type='submit'>Giriş Yap</button>
        </form>
      </div>
    </div>
  );
};

export default AccountProcess;
