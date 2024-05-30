'use client';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaEye, FaEyeSlash, FaCalendarAlt } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import styles from './register.module.css';

const CustomDateInput = ({
  value,
  onClick,
  placeholder
}: {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
}) => (
  <div className={styles.datepickerContainer} onClick={onClick}>
    <input
      value={value}
      onClick={onClick}
      placeholder={placeholder}
      className={styles.dateInput}
      inputMode='numeric'
    />
    <FaCalendarAlt className={styles.calendarIcon} />
  </div>
);

const RegisterForm: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);
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

    setFormErrors(errors);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*.?&]/.test(password)
    });
  };

  const handleNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(
      /[^a-zA-ZığüşöçİĞÜŞÖÇ\s]/g,
      ''
    );
  };

  return (
    <div className={styles.formContainer}>
      <h2>Kayıt Ol</h2>
      <form className={styles.registrationForm} onSubmit={validateForm}>
        <input type='email' name='email' placeholder='E-posta Adresi*' />
        {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}

        <div className={styles.nameContainer}>
          <div className={styles.inputGroup}>
            <input
              type='text'
              name='firstName'
              placeholder='Ad*'
              onInput={handleNameInput}
            />
            {formErrors.firstName && (
              <p className={styles.error}>{formErrors.firstName}</p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <input
              type='text'
              name='lastName'
              placeholder='Soyad*'
              onInput={handleNameInput}
            />
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
            onFocus={() => setShowPasswordCriteria(true)}
            onChange={handlePasswordChange}
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
        {showPasswordCriteria && (
          <div>
            <h1 className={styles.criteriaHeading}> ŞİFRE KISITLAMALARI</h1>
            <ul className={styles.passwordCriteria}>
              <li className={passwordCriteria.length ? styles.valid : ''}>
                En az 8 karakter uzunluğunda olmalıdır
              </li>
              <li className={passwordCriteria.uppercase ? styles.valid : ''}>
                Parolanız en az 1 büyük harf içermelidir
              </li>
              <li className={passwordCriteria.lowercase ? styles.valid : ''}>
                Parolanız en az 1 küçük harf içermelidir
              </li>
              <li className={passwordCriteria.number ? styles.valid : ''}>
                Parolanız en az 1 numara içermelidir
              </li>
              <li className={passwordCriteria.specialChar ? styles.valid : ''}>
                Parolanız en az 1 özel karakter içermelidir
              </li>
            </ul>
          </div>
        )}

        <InputMask
          mask='0 (599) 999 99 99'
          maskChar='_'
          type='tel'
          name='phoneNumber'
          placeholder='Telefon Numarası* (Örn: 0 (555) 123 4567)'
        />
        {formErrors.phoneNumber && (
          <p className={styles.error}>{formErrors.phoneNumber}</p>
        )}
        <div className={styles.dateGenderContainer}>
          <div className={styles.dateContainer}>
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
            />
            {formErrors.birthdate && (
              <p className={styles.error}>{formErrors.birthdate}</p>
            )}
          </div>

          <div className={styles.genderContainer}>
            <label>Cinsiyet</label>
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
