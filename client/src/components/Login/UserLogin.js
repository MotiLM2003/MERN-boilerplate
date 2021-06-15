import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { login } from '../../actions/customersActions';
import Bubbles from '../Bubbles/Bubbles';
import Error from './Error';

import logoIcon from '../../images/logo-icon.png';

import logo from '../../images/logo.png';
const containerVariants = {
  hidden: {
    opacity: 0.2,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, when: 'beforeChildren' },
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

const UserLogin = (props) => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    hasError: false,
  });

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  useEffect(() => {
    document.title = 'אתר דוגמה';
    console.log('test');
  }, []);

  useEffect(() => {
    const _isSignedIn = !!props.customer?._id;
    setIsSignedIn(_isSignedIn);
  }, [props.customer?._id]);

  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {}, [isSignedIn]);

  const initLogin = () => {
    const hasError =
      userDetails.email.length < 2 || userDetails.password.length < 2;
    setUserDetails({
      ...userDetails,
      hasError,
    });

    if (!hasError) {
      try {
        //eslint-disable-next-line
        const { data } = props.login(userDetails);

        setTimeout(() => {
          console.log('siigned', isSignedIn);
          setWrongPassword(!isSignedIn);
        }, 500);
      } catch (e) {
        console.log('error: ', e);
      }
    }
  };

  const loginWithEnter = (e) => {
    if (e.key === 'Enter') {
      initLogin();
    }
  };

  return (
    <motion.div
      className='login-container p-1 user-login-container'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <div className='login-container__corner-logo'>
        <img src={logo} alt='logo' />
      </div>
      <Bubbles />
      <div className='login-container__login-info mt-15'>
        <div
          className='login-container__logo-container'
          style={{ userSelect: 'none' }}
        >
          <motion.img src={logoIcon} alt='logo' variants={logoVariant} />
        </div>

        <div className='card-container bg-transparent-white login-container__form_fields'>
          <input
            type='text'
            placeholder='Email ou Username'
            className='mb-2'
            name='email'
            onChange={onChange}
            value={userDetails.email}
          />
          {}
          <input
            type='password'
            placeholder='Password'
            className='mb-1'
            name='password'
            onChange={onChange}
            onKeyPress={loginWithEnter}
            value={userDetails.password}
          />
          <motion.button
            className='button bg-blue mt-1 mb-2 login-container__login_button'
            onClick={initLogin}
          >
            Login
          </motion.button>
          {wrongPassword && <Error error='mauvais mot de passe' />}
          <div className='divider mt-1'></div>
          <p className='login-container__register mt-6'>
            Pas encore de compte?&nbsp;
            <Link className='button bg-gray-light ' to='/register'>
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const stateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};

export default connect(stateToProps, { login })(UserLogin);
