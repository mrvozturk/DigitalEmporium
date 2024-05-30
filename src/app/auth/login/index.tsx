'use client';
import React, { useState } from 'react';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible
} from 'react-icons/ai';import styles from './login.module.css';

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

    const password = form.password.value.trim();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.?&]).{8,}$/;
    if (password && !passwordRegex.test(password)) {
      errors.password =
        'Şifre en az 8 karakter, bir büyük harf, bir küçük harf, bir sayı ve bir özel karakter içermelidir';
    }

    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const errors = validateForm(form);

    if (Object.keys(errors).length === 0) {
      // Submit form if no errors
      console.log('Form submitted');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const form = e.target.form as HTMLFormElement;
    validateForm(form);
  };

  return (
    <div className={styles.loginFormContainer}>
      <h2>Giriş Yap</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='E-posta Adresi*'
          onChange={handleInputChange}
        />
        {formErrors.email && (
          <p className={styles.error}>{formErrors.email}</p>
        )}
        <div className={styles.passwordInputContainer}>
          <input
            className={styles.passwordInput}
            type={showLoginPassword ? 'text' : 'password'}
            name='password'
            placeholder='Şifre*'
            onChange={handleInputChange}
          />
          <button
            type='button'
            onClick={() => setShowLoginPassword(prevState => !prevState)}
            className={styles.eyeButton}
          >
            {showLoginPassword ? < AiOutlineEyeInvisible /> : < AiOutlineEye />}
     
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
