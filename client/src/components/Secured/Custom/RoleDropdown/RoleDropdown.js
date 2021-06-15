import React, { useRef } from 'react';
const roles = ['מזכירה', 'מוכר', 'מנהל'];

const SellerDropdown = ({ user, onChange }) => {
  const selectRef = useRef();
  return user ? (
    <select
      className={`seller-dropdown`}
      ref={selectRef}
      onChange={() => onChange(selectRef.current.value)}
    >
      <option value='0'>-- בחר תפקיד ---</option>
      {roles.map((role) => {
        const isActive =
          role.toLocaleLowerCase() === user.role.type.toLocaleLowerCase();
        return (
          <option
            key={role}
            value={role}
            selected={isActive}
          >{`${role}`}</option>
        );
      })}
    </select>
  ) : (
    <select>
      <option value='0'>Loading</option>
    </select>
  );
};

export default SellerDropdown;
