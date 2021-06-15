import React, { useState, useEffect } from 'react';
import img from '../../../images/logo.png';
import { connect } from 'react-redux';
import moment from 'moment';

import { Link, useHistory } from 'react-router-dom';
import { formatMoney } from '../../../utils/formatting';
import { logOut } from '../../../actions/customersActions';
import api from '../../../apis/api';
import FormModel from '../../FormModel/FormModel';
const Header = (props) => {
  const { user, customer } = props;
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [widthdrawAmount, setwithdrawAmount] = useState(customer.balance);
  const [withdrawError, setWithdrawError] = useState('');
  const [currentWithdraw, setCurrentWithdraw] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const getInitData = async () => {
      const { data } = await api.get(`/withdraw/get/${customer._id}`);
      setCurrentWithdraw(data);
    };

    getInitData();
  }, [customer._id]);
  const setLogOut = () => {
    props.logOut();
    props.logOut(customer);
    window.location = '/';
  };

  const backToAdmin = () => {
    props.logOut();
    history.push('/backoffice/customers/');
  };
  const renderAdminButton = () => {
    return (
      user.firstName && (
        <div className='header-container__item' onClick={backToAdmin}>
          <i className='fas fa-user-shield header-container__icon-1'></i>
        </div>
      )
    );
  };

  const addWithdrawRequest = async () => {
    if (widthdrawAmount > customer.balance) {
      setWithdrawError('Le solde de votre compte est insuffisant.');
      return;
    }
    const body = {
      amount: widthdrawAmount,
      owner: customer._id,
      status: 'pending',
    };
    setCurrentWithdraw(body);
    const withdraw = await api.post('/withdraw/save', body);
    setIsWithdraw(false);
  };

  const renderWithdrawForm = () => {
    if (currentWithdraw && currentWithdraw.status === 'rejected') {
      return (
        <FormModel isVisible={isWithdraw}>
          <div className='home-page-container__customer_add_item withdraw-model flex justifiy-content-center  direction-column'>
            <h2 className='add-item-header'>CONFIRMATION RETIRER DEMANDER</h2>
            <p
              style={{
                textAlign: 'center',
                fontSize: '14px',
                color: 'black',
              }}
            >
              Demande de retrait refusée, veuillez contacter le service client.
            </p>
            <button
              className='button bg-warning'
              onClick={() => {
                setIsWithdraw((prev) => !prev);
              }}
            >
              Annuler
            </button>
          </div>
        </FormModel>
      );
    }

    if (currentWithdraw) {
      const date = moment(currentWithdraw.createdAt).format(
        'DD-MM-YY HH:mm:ss'
      );
      return (
        <FormModel isVisible={isWithdraw}>
          <div className='home-page-container__customer_add_item withdraw-model flex justifiy-content-center  direction-column'>
            <h2 className='add-item-header'>CONFIRMATION RETIRER DEMANDER</h2>
            <p
              style={{
                textAlign: 'center',
                fontSize: '14px',
                color: 'black',
              }}
            >
              Une demande de retrait a déjà été soumise le: <br /> {date}
            </p>
            <button
              className='button bg-warning'
              onClick={() => {
                setIsWithdraw((prev) => !prev);
              }}
            >
              Annuler
            </button>
          </div>
        </FormModel>
      );
    }

    return (
      <FormModel isVisible={isWithdraw}>
        <div className='home-page-container__customer_add_item withdraw-model flex justifiy-content-center  direction-column'>
          <h2 className='add-item-header'>Demande de retrait de fondse</h2>
          {customer.balance > 0 ? (
            <React.Fragment>
              <p>veuillez saisir le montant que vous souhaitez retirer:</p>
              <div>
                <input
                  type='number'
                  style={{ width: '150px', textAlign: 'center' }}
                  placeholder='montant à retirer'
                  value={widthdrawAmount}
                  max={customer.balance}
                  onChange={(e) => setwithdrawAmount(e.target.value)}
                />
                &nbsp;<span style={{ fontSize: '14px' }}>€</span>
              </div>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: 'red',
                }}
              >
                {withdrawError}
              </div>
              <div className='add-item-buttons'>
                <button
                  className='button bg-success'
                  onClick={addWithdrawRequest}
                >
                  envoyer une demande
                </button>
                <button
                  className='button bg-warning'
                  onClick={() => {
                    setIsWithdraw((prev) => !prev);
                  }}
                >
                  Annuler
                </button>
              </div>
            </React.Fragment>
          ) : (
            <div
              style={{
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'red',
              }}
            >
              Le solde de votre compte est insuffisant.
              <button
                className='button bg-warning mt-6 display-inline-block'
                onClick={() => {
                  setIsWithdraw((prev) => !prev);
                }}
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      </FormModel>
    );
  };

  const depositParams = `&email=${customer.email}&p_CustomerID=${customer._id}`;

  return (
    <header className='header-container'>
      <div className='header-container__brand'>
        <Link to='/backoffice/dashboard'>
          <img src={img} alt='logo' />
        </Link>
      </div>
      <div className='header-container__toolbar'>
        <div>
          <div className='header-container__item'>
            <i class='far fa-credit-card'></i>
            <a
              href={`https://buy.oobit.com/ref/sa-sinef?cryptoCurrency=btc&currency=eur${depositParams}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              dépôt
            </a>
          </div>
          <div className='header-container__item'>
            <i class='fas fa-file-signature'></i>
            <a
              href='../../../../contrat.pdf'
              target='_blank'
              rel='noopener noreferrer'
            >
              Contrat
            </a>
          </div>
          <div className='header-container__item'>
            <i class='far fa-file-pdf'></i>
            <a
              href='../../../../kbis.pdf'
              target='_blank'
              rel='noopener noreferrer'
            >
              Kbis
            </a>
          </div>
          <div className='header-container__item'>
            <i className='fas fa-user'></i>
            {customer.firstName} {customer.lastName}
          </div>
          <div
            className='header-container__item'
            onClick={() => {
              setIsWithdraw((prev) => !prev);
            }}
          >
            <i className='fas fa-money-bill'></i>
            {formatMoney(customer.balance)}
          </div>
          <div className='header-container__item' onClick={setLogOut}>
            <i className='fas fa-sign-out-alt header-container__icon-2'></i>
            (Déconnexion)
          </div>
          {renderAdminButton()}
        </div>
      </div>
      {renderWithdrawForm()}
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
    user: state.userReducer,
  };
};

export default connect(mapStateToProps, { logOut })(Header);
