'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './index.module.css';

const AccountProcess: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null); 

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
          <div className={styles.dateLabel}>Doğum Tarihi</div>

          <div className={styles.dateContainer}>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              placeholderText='gg/aa/yyyy'
              dateFormat='dd/MM/yyyy'
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
