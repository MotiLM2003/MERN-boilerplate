import React, { useState } from 'react';

import Users from './Users/Users';
import Reports from './Reports/Reports';

const Manage = () => {
  const [menu, setMenu] = useState(1);
  console.log(' in manage');
  const isSelectedClass = (x) => {
    return menu === x ? 'selected' : '';
  };

  const changeMenu = (x) => {
    setMenu(x);
  };

  const getComponent = () => {
    switch (menu) {
      case 1: {
        return <Users />;
      }
      case 2: {
        return <Reports />;
      }
      case 3: {
        return <Users />;
      }
      default: {
        return <Users />;
      }
    }
  };
  return (
    <div className='manage'>
      <div className='manage__buttons'>
        <button
          className={`button ${isSelectedClass(1)}`}
          onClick={() => changeMenu(1)}
        >
          נהל משתמשים
        </button>
        <button
          className={`button ${isSelectedClass(2)}`}
          onClick={() => changeMenu(2)}
        >
          ניהול דוחות
        </button>
      </div>
      <div className='manage-content'>{getComponent()}</div>
    </div>
  );
};

export default Manage;
