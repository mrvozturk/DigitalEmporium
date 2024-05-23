'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './register.module.css';

const RegisterForm: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

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

    if (!selectedDate) errors.birthdate = 'Bu alan zorunludur';
    const password = form.password.value.trim();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.?&]).{8,}$/;
    if (password && !passwordRegex.test(password)) {
      errors.password =
        'Şifre en az 8 karakter, bir büyük harf, bir küçük harf, bir sayı ve bir özel karakter içermelidir';
    }
    setFormErrors(errors);
  };

  return (
    <div className={styles.formContainer}>
      <h2>Kayıt Ol</h2>
      <form className={styles.registrationForm} onSubmit={validateForm}>
        <input type='email' name='email' placeholder='E-posta Adresi*' />
        {formErrors.email && (
          <p className={styles.error}>{formErrors.email}</p>
        )}{' '}
        <p className={styles.emailRequired}>
          * ile işaretlenmiş alanlar zorunludur
        </p>
        <div className={styles.nameContainer}>
          <div className={styles.inputGroup}>
            <input type='text' name='firstName' placeholder='Ad*' />
            {formErrors.firstName && (
              <p className={styles.error}>{formErrors.firstName}</p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <input type='text' name='lastName' placeholder='Soyad*' />
            {formErrors.lastName && (
              <p className={styles.error}>{formErrors.lastName}</p>
            )}
          </div>
        </div>
        <div className={styles.passwordInputContainer}>
          <input
            className={styles.passwordInput}
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Şifre*'
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className={styles.eyeButton}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {formErrors.password && (
          <p className={styles.error}>{formErrors.password}</p>
        )}
        <input
          type='tel'
          name='phoneNumber'
          placeholder='Telefon Numarası* (Örn: 5551234567)'
        />
        {formErrors.phoneNumber && (
          <p className={styles.error}>{formErrors.phoneNumber}</p>
        )}
        <div className={styles.dateGenderContainer}>
          <div className={styles.dateContainer}>
            <label htmlFor='birthdate'>Doğum Tarihi*</label>
            <DatePicker
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
            />
            {formErrors.birthdate && (
              <p className={styles.error}>{formErrors.birthdate}</p>
            )}
          </div>
          <div className={styles.genderContainer}>
            <label>Cinsiyet*</label>
            <div>
              <input type='radio' name='gender' value='female' />
              <label> Kadın </label>
              <input type='radio' name='gender' value='male' />
              <label> Erkek</label>
              <input type='radio' name='gender' value='other' />
              <label> Diğer</label>
            </div>
            {formErrors.gender && (
              <p className={styles.error}>{formErrors.gender}</p>
            )}
          </div>
        </div>
        <button type='submit' className={styles.signUpButton}>
          KAYIT OL
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
