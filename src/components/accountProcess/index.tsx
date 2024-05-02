'use client';
import React from 'react';
import styles from './index.module.css';

const AccountProcess: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Kayıt Olma Formu */}
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
          <div className={styles.dateContainer}>
            <div>
              <input type='number' name='day' placeholder='Gün*' />
            </div>
            <div>
              <input type='number' name='month' placeholder='Ay*' />
            </div>
            <div>
              <input type='number' name='year' placeholder='Yıl' />
            </div>
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
