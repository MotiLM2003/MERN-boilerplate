/* eslint-disable */
import React, { useRef } from 'react';
import api from '../../../../apis/api';
const SellerDropdown = ({
  users,
  onUserChange,
  currentUser,
  defaultText = '-- צור משתמש חדש --',
  name = 'owner',
  withSellerTitle = true,
  withDefaultOption = true,
}) => {
  const selectRef = useRef();
  return users ? (
    <select
      className={`seller-dropdown w-300`}
      ref={selectRef}
      name={name}
      onChange={onUserChange}
    >
      {withDefaultOption && <option value='0'>{defaultText}</option>}
      {users.map((user) => {
        const title = withSellerTitle ? `- (${user.role.type})` : '';
        return (
          <option
            key={user._id}
            value={user._id}
            selected={user._id === currentUser?._id}
          >{`${user.firstName} ${user.lastName} ${title}`}</option>
        );
      })}
    </select>
  ) : (
    <select className='w-300'>
      <option value='0'>טוען נתונים...</option>
    </select>
  );
};

export default SellerDropdown;
