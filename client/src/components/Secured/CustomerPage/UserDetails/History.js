import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import api from '../../../../apis/api';
import { formatMoney } from '../../../../utils/formatting';
import moment from 'moment';

const History = (props) => {
  const [logs, setLogs] = useState(null);

  const { customer } = props;
  useEffect(() => {
    const getLogs = async () => {
      const { data } = await api.get(
        `/deposit-logs/get-by-customer/${customer.id}`
      );
      const newLogs = data.filter((x) => parseInt(x.depositType) !== 1);
      setLogs(newLogs);
    };
    getLogs();
  }, []);

  const renderHeaders = () => {
    return (
      <tr>
        <th>Date</th>
        <th>Mode</th>
        <th>Montant</th>
      </tr>
    );
  };

  const renderInventory = () => {
    return logs && logs.length > 0 ? (
      logs.map((log) => {
        const date = moment(log.createdAt).format('DD-MM-YY HH:mm:ss');

        return (
          <tr key={log._id}>
            <td>{date}</td>
            <td>{log.method}</td>
            <td>{formatMoney(log.amount)}</td>
          </tr>
        );
      })
    ) : (
      <td colspan='3' className='deposit-history__no-history'>
        Aucun historique de dépôt n'a été trouvé
      </td>
    );
  };

  return (
    <div className='deposit-history'>
      <table className='cards-container__inventory-list'>
        <thead>{renderHeaders()}</thead>
        <tbody>{renderInventory()}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};

export default connect(mapStateToProps)(History);
