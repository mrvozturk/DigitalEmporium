'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaEye, FaEyeSlash} from 'react-icons/fa';
import styles from './index.module.css';

const AccountProcess: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showRegistrationPassword, setShowRegistrationPassword] = useState<
    boolean
  >(false);
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (type: 'registration' | 'login') => {
    if (type === 'registration') {
      setShowRegistrationPassword(prevState => !prevState);
    } else {
      setShowLoginPassword(prevState => !prevState);
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
              className={styles.eyeButton}
            >
              {showRegistrationPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <input
            type='tel'
            name='phoneNumber'
            placeholder='Telefon Numarası*'
          />

          <div className={styles.dateGenderContainer}>
            <div className={styles.dateContainer}>
              <label htmlFor='birthdate'>Doğum Tarihi</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                dateFormat='dd/MM/yyyy'
                placeholderText='dd/MM/yyyy'
                showMonthDropdown
                showYearDropdown
                dropdownMode='scroll'
                minDate={new Date(1950, 0, 1)}
                maxDate={new Date(2024, 11, 31)}
                scrollableMonthYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={78}
              />
            </div>
            <div className={styles.genderContainer}>
              <label htmlFor='gender'>Cinsiyet</label>
              <div>
                <input type='radio' name='gender' value='female' />
                <label> Kadın </label>
                <input type='radio' name='gender' value='male' />
                <label> Erkek</label>
                <input type='radio' name='gender' value='other' />
                <label> Diğer</label>
              </div>
            </div>
          </div>

          <button type='submit' className={styles.signUpButton}>KAYIT OL</button>
        </form>
      </div>
      <div className={styles.loginFormContainer}>
        <h2>Giriş Yap</h2>
        <form className={styles.loginForm}>
          <input type='email' name='email' placeholder='E-posta Adresi*' />
          <div className={styles.passwordInputContainer}>
            <input
              className={styles.passwordWrapper}
              type={showLoginPassword ? 'text' : 'password'}
              name='password'
              placeholder='Şifre*'
            />
            <button
              type='button'
              onClick={() => togglePasswordVisibility('login')}
              className={styles.eyeButton}
            >
              {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type='submit' className={styles.loginButton}>GİRİŞ YAP</button>
        </form>
      </div>
    </div>
  );
};

export default AccountProcess;
