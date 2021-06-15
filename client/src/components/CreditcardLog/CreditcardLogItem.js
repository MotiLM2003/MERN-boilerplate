import React from 'react';
import moment from 'moment';

const CreditcardLogItem = ({ index, p }) => {
  const date = moment(p.createdAt).format('DD-MM-YY HH:mm:ss');
  return (
    <div
      class='withdraw flex align-items-center'
      style={{ background: index % 2 === 0 ? '' : '#f7f8fa' }}
    >
      <div>{date}</div>
      <div>{`${p.employeeId.firstName} ${p.employeeId.lastName}`}</div>
      <div>{p.employeeId.balance}</div>
      <div>{p.crypto}</div>
      <div style={{ color: p.status === '0' ? 'red' : 'green' }}>
        {p.status_string}
      </div>
    </div>
  );
};

export default CreditcardLogItem;
