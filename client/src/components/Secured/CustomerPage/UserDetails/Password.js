import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateCustomer } from '../../../../actions/customersActions';
const Password = (props) => {
  const { customer } = props;
  const [isUpdate,setIsUpdate] = useState(false)
  const [password, setPassword] = useState({
    originalPassword: { text : '', error: false},
    newPassword:  { text : '', error: false},
    confirmation:  { text : '', error: false},
  });
 
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPassword({ ...password, [name]: {...password.[name], text : value} });
  };


  const upddatePassword = () => {

    const isRealPassword = customer.userPassword.toString().trim() !== password.originalPassword.text.toString().trim();
    const isPasswordMatch =  password.newPassword.text.length === 0 ||  password.newPassword.text !== password.confirmation.text;
    
    let isValid = true;
    if (isRealPassword || isPasswordMatch) {
      isValid = false;
    }
   
    setPassword({ ...password, originalPassword: { ...password.originalPassword, error: isRealPassword },  newPassword: { ...password.newPassword, error: isPasswordMatch } });
   
    
    if (isValid) {
      console.log('updating password');
      props.updateCustomer({ _id: customer._id, updates: { userPassword : password.newPassword.text} });
      setIsUpdate(true)
    }
  }
  return (
    <div>
      <div className='user-info'>
        <div className='user-info__container'>
          <div className='flex'>
            <label>Mot de passe actuel:</label>
            <input
              type='password'
              className="w-300"
              placeholder='Mot de passe actuel'
              name='originalPassword'
              value={password.originalPassword.text}
              onChange={onChange}
            />
            {password.originalPassword.error && <div className="user-info__passowrd-change ">Veuillez saisir votre mot de passe actuel.</div>}
          </div>
          <div className='flex'>
            <label>Nouveau mot de passe:</label>
            <input
              type='password'
              className="w-300"
              placeholder='Nouveau mot de passe'
              name='newPassword'
              value={password.newPassword.text}
              onChange={onChange}
            />
            {password.newPassword.error && <div className="user-info__passowrd-change ">les mots de passe doivent correspondre.</div>}
             {isUpdate && <div className="user-info__passowrd-change-success">Mot de passe mis à jour avec succès</div>}
          </div>
          <div className='flex'>
            <label>Confirmez:</label>
            <input
              type='password'
              className="w-300"
              placeholder='Confirmez'
              name='confirmation'
              value={password.confirmation.text}
              onChange={onChange}
            />
          </div>
          <div>
             <button onClick={upddatePassword} className="button mt-3 bg-in-success">mettre à jour le mot de passe.</button>
          </div>

        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};
export default connect(mapStateToProps, { updateCustomer }) (Password);
