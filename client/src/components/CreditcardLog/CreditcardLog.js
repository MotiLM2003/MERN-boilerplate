import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import api from '../../apis/api';
import CreditcardLogItem from './CreditcardLogItem';

const CreditcardLog = () => {
  const [log, setLog] = useState(null);
  useEffect(() => {
    console.log('her');
    const getInitData = async () => {
      const { data } = await api.get(`/api/get`);
      console.log(data);
      setLog(data);
    };

    getInitData();
  }, []);

  return (
    <div>
      {log && (
        <React.Fragment>
          <div
            class='withdraw flex align-items-center'
            style={{ background: '#f7f8fa' }}
          >
            <div>Date</div>
            <div>Name</div>
            <div>Balance</div>
            <div>Crypto</div>
            <div>Status bv</div>
          </div>
          {log.map((p, index) => (
            <CreditcardLogItem p={p} index={index} />
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default CreditcardLog;
