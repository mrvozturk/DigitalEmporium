'use client';
import React from 'react';

import LoginForm from './login';
import RegisterForm from './register';

import style from './index.module.css';

const AccountProcess: React.FC = () => {
  return (
    <div className={style.container}>
      <RegisterForm />
      <LoginForm />
    </div>
  );
};

export default AccountProcess;
