import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import api from '../../apis/api';
import WithdrawItem from './WithdrawItem';
const PendingWithdraw = (props) => {
  const [pending, setPending] = useState(null);
  useEffect(() => {
    const getInitData = async () => {
      const { data } = await api.get(`/withdraw/get-all`);
      setPending(data);
    };

    getInitData();
  }, []);

  return (
    <div>
      {pending && (
        <React.Fragment>
          <div
            class='withdraw flex align-items-center'
            style={{ background: '#f7f8fa' }}
          >
            <div>Date</div>
            <div>Name</div>
            <div>Withraw amount</div>
            <div>Balance</div>
            <div>Status bv</div>
            <div>Action</div>
          </div>

          {pending.map((p, index) => (
            <WithdrawItem p={p} index={index} />
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};
export default connect(mapStateToProps)(PendingWithdraw);
