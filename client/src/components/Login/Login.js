/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { login } from '../../actions/userActions';

import Error from './Error';

import logoIcon from '../../images/logo-icon.png';

import logo from '../../images/logo-icon.png';

const containerVariants = {
  hidden: {
    opacity: 0.2,
    y: -120,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, type: 'tween', ease: 'easeInOut' },
  },
};

const logoVariant = {
  hidden: {
    scale: 0,
    opacity: 0,
    rotateY: 0,
    y: '-4rem',
  },
  visible: {
    scale: 1,
    rotateY: 360,
    opacity: 1,
    transition: { delay: 0.1, duration: 1.4, type: 'tween', ease: 'easeInOut' },
  },
};

const logoTextVariant = {
  hidden: {
    opacity: 0,

    y: '-4rem',
  },
  visible: {
    opacity: 1,

    transition: { duration: 1, type: 'tween', ease: 'easeOut' },
  },
};

const Login = (props) => {
  const [userDetails, setUserDetails] = useState({
    email: 'motiphone2003@gmail.com',
    password: '1234',
    hasError: false,
  });

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    document.title = 'אתר דוגמה';
  }, []);

  useEffect(() => {
    const _isSignedIn = !!props.user?._id;
    setIsSignedIn(_isSignedIn);
  }, [props.user?._id]);

  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // window.location = '/backoffice/dashboard/';
  }, [isSignedIn]);

  const initLogin = () => {
    const hasError =
      userDetails.email.length < 2 || userDetails.password.length < 2;
    setUserDetails({
      ...userDetails,
      hasError,
    });

    if (!hasError) {
      try {
        props.login(userDetails);
      } catch (e) {}
    }
  };

  return isSignedIn ? (
    <Redirect to='/backoffice/dashboard' />
  ) : (
    <motion.div
      className='login-container wrapper p-1'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      className='flex align-items-center justify-center'
      style={{ height: '100vh' }}
    >
      <div className='login-container__login-info'>
        <div className='login-container__logo-container mb-4'>
          <img src={logo} alit='logo' style={{ width: '64%' }} />
        </div>

        <div className='card-container bg-transparent-white login-container__form_fields shadow-bold-1'>
          <input
            type='text'
            placeholder='שם משתמש'
            className='mb-2'
            name='email'
            onChange={onChange}
            value={userDetails.email}
          />

          <input
            type='password'
            placeholder='סיסמה'
            className='mb-1'
            name='password'
            onChange={onChange}
            value={userDetails.password}
          />
          <motion.button
            className='button bg-blue mt-1 mb-2 login-container__login_button'
            onClick={initLogin}
          >
            כניסה
          </motion.button>
          {userDetails.hasError && <Error error='שם או סיסמה לא נכונים' />}
        </div>
      </div>
    </motion.div>
  );
};

const stateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

export default connect(stateToProps, { login })(Login);
