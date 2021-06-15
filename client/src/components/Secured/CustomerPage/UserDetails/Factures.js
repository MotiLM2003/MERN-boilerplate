import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import api from '../../../../apis/api';
import { formatMoney } from '../../../../utils/formatting';
import moment from 'moment';
import { saveAs } from 'file-saver';

const Factures = ({ customer }) => {
  const [currentGroups, setCurrentGroups] = useState(null);

  const getFilterdGroup = () => {
    return customer.inventories.filter((x) => x.status !== 0);
  };

  useEffect(() => {
    const groups = getFilterdGroup();
    setCurrentGroups(groups);
  }, []);

  const downloadPdf = async (itemId) => {
    const { data } = await api.get(`/pdf/get/${customer._id}/${itemId}`, {
      responseType: 'blob',
    });

    const pdfBlob = new Blob([data], { type: 'application/pdf' });
    saveAs(pdfBlob, 'pdf');
  };

  const renderInventory = () => {
    return currentGroups && currentGroups.length > 0 ? (
      currentGroups.map((group) => {
        const date = moment(group.createdAt).format('DD-MM-YY HH:mm:ss');

        return (
          <tr key={group._id}>
            <td>{date}</td>
            <td>{group.inventory.items[0].text}</td>
            <td
              className='factures__download'
              onClick={() => downloadPdf(group._id)}
            >
              <i class='fas fa-file-download'></i>
            </td>
          </tr>
        );
      })
    ) : (
      <td colspan='3' className='deposit-history__no-history'>
        ce pas d'historique de transaction disponible actuellement.
      </td>
    );
  };

  const renderHeaders = () => {
    return (
      <tr>
        <th>Date</th>
        <th>Montant</th>
        <th>Téléchargement</th>
      </tr>
    );
  };

  return (
    <div className='factures'>
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

export default connect(mapStateToProps)(Factures);
