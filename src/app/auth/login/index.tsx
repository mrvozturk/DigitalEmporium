'use client';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from './login.module.css';

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
    if (!email) {
      errors.email = 'Bu alan zorunludur';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Geçerli bir e-posta adresi girin';
    }

    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errors = validateForm(form);

    if (Object.keys(errors).length === 0) {
      // Form is valid, proceed with form submission or API call
      console.log('Form submitted successfully');
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <h2>Giriş Yap</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
        <input type='email' name='email' placeholder='E-posta Adresi*' />
        {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}
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
            {showLoginPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
        {formErrors.password && (
          <p className={styles.error}>{formErrors.password}</p>
        )}
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
