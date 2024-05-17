'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './login.module.css';

const LoginForm: React.FC = () => {
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);

  return (
    <div className={styles.loginFormContainer}>
      <h2>Giriş Yap</h2>
      <form className={styles.loginForm}>
        <input type='email' name='email' placeholder='E-posta Adresi*' />
        <div className={styles.passwordInputContainer}>
          <input
            className={styles.passwordInput}
            type={showLoginPassword ? 'text' : 'password'}
            name='password'
            placeholder='Şifre*'
          />
          <button
            type='button'
            onClick={() => setShowLoginPassword(prevState => !prevState)}
            className={styles.eyeButton}
          >
            {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <a
          href='/user/password/reset/'
          className={styles.forgotPassword}
          target='_blank'
        >
          Şifremi Unuttum
        </a>
        <button type='submit' className={styles.loginButton}>
          GİRİŞ YAP
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
