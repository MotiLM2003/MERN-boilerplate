import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import SellerDropdown from '../../Custom/SellerDropdown/SellerDropdown';
import RoleDropdown from '../../Custom/RoleDropdown/RoleDropdown';
import api from '../../../../apis/api';

const Users = () => {
  const userTamplate = {
    _id: 0,
    firstName: '',
    lastName: '',
    userName: '',
    userPassword: '',
    phone: '',
    email: '',
    isActive: true,
    idNumber: '',
    address: '',
    role: { type: 'מוכר' },
  };

  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(userTamplate);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await api.get('users/');
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, []);

  const onUserChange = (id) => {
    const _id = id.target.value;
    if (_id === '0') {
      setCurrentUser(userTamplate);
      return;
    }
    const user = users.find((x) => x._id === _id);
    setCurrentUser(user);
  };

  const onActiveChange = (e) => {
    setCurrentUser({ ...currentUser, isActive: e.target.checked });
  };
  const inputChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const onUpdate = async () => {
    try {
      const { data } = await api.post('/users/save-user', {
        _id: currentUser._id,
        update: currentUser,
      });
      if (currentUser._id !== '0') {
        setUsers(
          users.map((user) => {
            return user._id === currentUser._id ? { ...currentUser } : user;
          })
        );
        toast.success('👍  פרטי משתמש עודכנו.');
      } else {
        setUsers([...users, data]);
        setCurrentUser(data);
        toast.success('👍  משתמש חדש נוצר בהצלחה');
      }
    } catch (err) {
      toast.error('👎 שגיאה, נא לוודא שמילאת את כל התאים.');
      console.log('error');
    }
  };
  const buttonText =
    currentUser._id === 0 ? 'צור משתמש חדש' : 'עדכן פרטי משתמש';
  return (
    <div className='users'>
      <SellerDropdown
        className='seller-dropdown'
        users={users}
        onUserChange={onUserChange}
        currentUser={currentUser}
      />
      <div className='manage__sellers'>
        <div>
          <input
            type='checkbox'
            checked={currentUser.isActive}
            onChange={onActiveChange}
          />
          <label> פעיל</label>
        </div>
        <input
          type='number'
          value={currentUser.idNumber}
          onChange={inputChange}
          placeholder='תעודת זהות'
          name='idNumber'
          className='w-300'
        />
        <input
          type='text'
          value={currentUser.firstName}
          onChange={inputChange}
          placeholder='שם פרטי'
          name='firstName'
        />
        <input
          type='text'
          value={currentUser.lastName}
          placeholder='שם משפחה'
          onChange={inputChange}
          name='lastName'
        />
        <input
          type='text'
          value={currentUser.phone}
          placeholder='נייד'
          onChange={inputChange}
          name='phone'
        />
        <input
          type='text'
          value={currentUser.email}
          placeholder='איימיל'
          onChange={inputChange}
          name='email'
        />
        <input
          type='text'
          value={currentUser.address}
          onChange={inputChange}
          placeholder='כתובת'
          name='address'
        />
        <input
          type='text'
          value={currentUser.userName}
          placeholder='שם משתמש'
          onChange={inputChange}
          name='userName'
        />
        <input
          type='text'
          value={currentUser.userPassword}
          placeholder='סיסמה'
          onChange={inputChange}
          name='userPassword'
        />
        <div>
          <RoleDropdown
            user={currentUser}
            onChange={(value) => {
              setCurrentUser({ ...currentUser, role: { type: value } });
            }}
          />
        </div>
        <div>
          <button className='button bg-secondary' onClick={onUpdate}>
            {buttonText}
          </button>
        </div>
      </div>
      <ToastContainer position='bottom-left' autoClose={2500} />
    </div>
  );
};

export default Users;
