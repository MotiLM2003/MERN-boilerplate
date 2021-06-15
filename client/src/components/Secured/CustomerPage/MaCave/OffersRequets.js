/* eslint-disable */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { formatMoney } from '../../../../utils/formatting';
import {
  deleteInventoryOffer,
  updateGroup,
  updateBalance,
} from '../../../../actions/customersActions';

const OffersRequets = (props) => {
  const { headers } = props;
  const [currentGroups, setCurrentGroups] = useState(null);

  const getFilterdGroup = () => {
    return props.customer.inventories.filter((x) => x.status === 1);
  };

  useEffect(() => {
    const groups = getFilterdGroup();
    setCurrentGroups(groups);
  }, []);

  useEffect(() => {
    const groups = getFilterdGroup();
    setCurrentGroups(groups);
  }, [props.customer]);

  const deleteOffer = (group, offerId) => {
    props.deleteInventoryOffer({ group, offerId });
  };

  const acceptOffer = (group, offer) => {
    const balance = offer.offer;
    props.updateGroup(group, { status: 3 });
    props.updateBalance(props.customer._id, balance);
    // setCurrentGroups(getFilterdGroup());
  };

  const renderHeaders = () => {
    return (
      headers && (
        <tr>
          <th>{headers[0]}</th>
          <th>{headers[1]}</th>
          <th>{headers[2]}</th>
          <th>Prix d'achat</th>
          <th>Prix de l'offre</th>
          <th className='text-align-center'>Expiration</th>
          <th colspan='2' className='text-align-center'>
            Action
          </th>
        </tr>
      )
    );
  };

  const renderButtons = (isAfter, group, offer) => {
    if (isAfter) {
      return (
        <React.Fragment>
          <td
            colspan='2'
            style={{ textAlign: 'center' }}
            className='bg-warning'
          >
            <button
              className='button bg-warning'
              onClick={() => deleteOffer(group, offer._id)}
              style={{
                marginLeft: '5px',

                color: 'white',
              }}
            >
              la date limite est terminée (Delete offer)
            </button>
          </td>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <td
            className='home-page-container__add-item bg-in-success text-align-center'
            onClick={() => acceptOffer(group, offer)}
          >
            J'accepte
          </td>
          <td
            className='home-page-container__add-item bg-in-warning text-align-center'
            onClick={() => deleteOffer(group, offer._id)}
          >
            Rejeter
          </td>
        </React.Fragment>
      );
    }
  };

  const renderInventory = () => {
    return (
      currentGroups &&
      currentGroups.map((group) => {
        return group.offers.map((offer) => {
          let { date } = offer;
          if (date === undefined) {
            date = group.createdAt;
          }
          const isAfter = moment().isAfter(offer.date);
          date = moment(date).format('DD-MM-YY HH:mm:ss');
          return (
            <tr key={offer._id}>
              <td>{group.inventory.items[0].text}</td>
              <td>{group.inventory.items[1].text}</td>
              <td>{group.inventory.items[2].text}</td>
              <td>{formatMoney(offer.price)}</td>
              <td>{formatMoney(offer.offer)}</td>
              <td className='text-align-center'>{date}</td>
              {renderButtons(isAfter, group, offer)}
            </tr>
          );
        });
      })
    );
  };

  return (
    <div>
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

export default connect(mapStateToProps, {
  deleteInventoryOffer,
  updateGroup,
  updateBalance,
})(OffersRequets);
