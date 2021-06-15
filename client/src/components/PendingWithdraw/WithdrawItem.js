import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import api from '../../apis/api';
import { updateBalance } from '../../actions/customersActions';

const WithdrawItem = ({ p, index, customer, updateBalance }) => {
  const [item, setItem] = useState(p);
  const date = moment(p.createdAt).format('DD-MM-YY HH:mm:ss');

  const submit = async (id, balance) => {
    const { data } = await api.put(`/withdraw/update`, item);
    if (item.status === 'accept') {
      updateBalance(id, balance);
      setItem({
        ...item,
        owner: { ...item.owner, balance: item.owner.balance + balance },
      });
    } else if (item.status === 'rejected') {
      console.log('update status withdraw status.');
    }
  };

  return (
    <div
      class='withdraw flex align-items-center'
      style={{ background: index % 2 === 0 ? '' : '#f7f8fa' }}
    >
      <div>{date}</div>
      <div>{`${p.owner.firstName} ${p.owner.lastName}`}</div>
      <div>{p.amount}€</div>
      <div>{item.owner.balance}€</div>
      <div>
        <select
          value={item.status}
          onChange={(e) => {
            setItem({ ...item, status: e.target.value });
          }}
        >
          <option value='panding'>Pending</option>
          <option value='rejected'>Rejected</option>
          <option value='accept'>Accept</option>
        </select>
      </div>
      <div>
        {item.status !== 'accept1' && (
          <button
            className='button bg-blue'
            onClick={() => submit(p.owner._id, -1 * Math.abs(p.amount))}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};
export default connect(mapStateToProps, { updateBalance })(WithdrawItem);
