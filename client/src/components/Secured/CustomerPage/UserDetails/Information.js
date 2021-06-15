/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import SelectCountry from '../../../SelectCountry';
import { updateCustomer } from '../../../../actions/customersActions';
const Information = (props) => {
  const initialCustomer = {
    firstName: props.customer.firstName,
    lastName: props.customer.lastName,
    email: props.customer.email,
    country: props.customer.country,
    phone: props.customer.phone,
    address: props.customer.address,
    postalCode: props.customer.postalCode,
    userPassword: '',
    userRePassword: '',
    ville: props.customer.ville,
  };
  const [customer, setCustomer] = useState(() => initialCustomer);

  const [hasErrors, setHasErrors] = useState(false);
  const [didUpdate, setDidUpdate] = useState(false);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    validateForm();
    setCustomer({ ...customer, [name]: value });
  };

  let handleOnChange = (email) => {
    // don't remember from where i copied this code, but this works.
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      return true;
      j;
    } else {
      return false;
    }
  };

  useEffect(() => {
    validateForm();
  }, [customer]);

  useEffect(() => {
    if (hasErrors) {
      setDidUpdate(false);
    }
  }, [hasErrors]);
  const validateForm = () => {
    let _hasError = false;
    setHasErrors(_hasError);
    // checking if customer made change to his password
    if (customer.userPassword.trim() === '') {
      // if not delete userPassword proprty from object
    } else {
      // check password CONFIRMATION
      if (customer.userPassword.trim() !== customer.userRePassword.trim()) {
        _hasError = true;
      }
    }

    if (
      !handleOnChange(customer.email) ||
      customer.firstName.length < 3 ||
      customer.lastName.length < 3
    ) {
      _hasError = true;
    }

    setHasErrors(_hasError);
  };
  const updateDetails = (e) => {
    if (!hasErrors) {
      props.updateCustomer({ _id: props.customer._id, updates: customer });
      setCustomer(initialCustomer);
      setDidUpdate(true);
      setTimeout(() => {
        setDidUpdate(false);
      }, 5000);
    }
  };

  const isPasswordMatch = () => {
    const result =
      customer.userPassword.trim() === '' ||
      (customer.userPassword > 3 &&
        customer.userPassword === customer.userRePassword);
    return result;
  };

  // error items varations
  const errorItemVariant = {
    hidden: {
      y: -110,
      opacity: 0.2,
    },
    visible: {
      y: 0,
      opacity: 1,

      transition: {
        type: 'spring',
        ease: 'easeInOut',
        stiffness: 500,
      },
    },
  };

  const containerVariants = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 1,

      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.1,
      },
    },
  };

  const successVariant = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 1,

      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: 1,
      },
    },
  };
  return (
    <div>
      <div className='user-info'>
        <div className='user-info__container'>
          <div className='flex'>
            <label>Prénom:</label>
            <input
              type='text'
              placeholder='Prénom'
              name='firstName'
              value={customer.firstName}
              onChange={onChange}
            />
          </div>
          <div className='flex'>
            <label>Nom:</label>
            <input
              type='text'
              placeholder='Nom'
              name='lastName'
              value={customer.lastName}
              onChange={onChange}
            />
          </div>

          <div className='flex'>
            <label>E-mail:</label>
            <input
              type='text'
              placeholder='E-mail'
              name='email'
              value={customer.email}
              onChange={onChange}
            />
          </div>
          <div className='flex'>
            <label>Téléphone:</label>
            <input
              type='text'
              placeholder='Téléphone'
              name='phone'
              value={customer.phone}
              onChange={onChange}
            />
          </div>
          <div className='flex'>
            <label>Pays:</label>
            <SelectCountry
              value={customer.country}
              name='country'
              onChange={onChange}
            />
          </div>
        </div>
        <div className='user-info__container'>
          <div className='flex'>
            <label>Adresse:</label>
            <input
              type='text'
              placeholder='adress'
              name='address'
              value={customer.address}
              onChange={onChange}
            />
          </div>
          <div className='flex'>
            <label>Code postal:</label>
            <input
              type='text'
              placeholder='Code postal'
              name='postalCode'
              value={customer.postalCode}
              onChange={onChange}
            />
          </div>
          <div className='flex'>
            <label>Ville:</label>
            <input
              type='text'
              placeholder='Ville'
              name='ville'
              value={customer.ville}
              onChange={onChange}
            />
          </div>
        
        </div>
        {didUpdate && (
          <motion.div className='user-info__form-success'>
            <motion.div
              className='bg-success p-4 rounded font-1'
              variants={successVariant}
              initial='hidden'
              animate='visible'
            >
              Les informations ont été mis à jour avec succès
            </motion.div>
          </motion.div>
        )}
        {hasErrors && (
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='user-info__container user-info__form-errors flex-columns'
          >
            {customer.firstName.length < 3 && (
              <motion.div
                className='user-info__error-item'
                variants={errorItemVariant}
                initial='hidden'
                animate='visible'
              >
                Le prénom doit comporter au moins 3 caractères
              </motion.div>
            )}
            {customer.lastName.length < 3 && (
              <motion.div
                className='user-info__error-item'
                variants={errorItemVariant}
                initial='hidden'
                animate='visible'
              >
                Le nom de famille doit comporter au moins 3 caractères
              </motion.div>
            )}
            {!handleOnChange(customer.email) && (
              <motion.div
                className='user-info__error-item'
                variants={errorItemVariant}
                initial='hidden'
                animate='visible'
              >
                L'e-mail doit être une adresse e-mail valide
              </motion.div>
            )}
            {!isPasswordMatch() && (
              <motion.div
                className='user-info__error-item'
                variants={errorItemVariant}
                initial='hidden'
                animate='visible'
              >
                passwords does not match.
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
      <div className='user-info__buttons'>
        <button className='button bg-in-success' onClick={updateDetails}>
          Mettre à jour les détails
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};

export default connect(mapStateToProps, { updateCustomer })(Information);
