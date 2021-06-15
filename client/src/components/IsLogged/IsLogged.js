import React, { useState, useEffect } from 'react';
import api from '../../apis/CustomerApi';
import adminApi from '../../apis/api';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/customersActions';
import { login as adminLogin } from '../../actions/userActions';
const IsLogged = (props) => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const path = props.location.pathname;
  const isAdmin = path.indexOf('backoffice') > -1;
  const mainPath = isAdmin ? '/backoffice' : '/';

  const setData = async (data) => {
    setUser(data);
    const customerDetails = {
      email: data.email,
      password: data.userPassword,
    };
    if (!isAdmin) {
      const user = await props.login(customerDetails, false);
    } else {
      const user = await props.adminLogin(customerDetails, false);
    }
  };

  useEffect(() => {
    let user = null;
    const getUser = async () => {
      try {
        if (!isAdmin) {
          const { data } = await api.post('/refresh/', { isAdmin });
          setData(data);
          user = data;
        } else {
          const { data } = await adminApi.post('/refresh/admin', {
            isAdmin: true,
          });
          setData(data);
          user = data;
        }
      } catch (error) {
        history.push(mainPath);
      }
      if (user) {
        setTimeout(() => {
          history.push(path);
        }, 0);
      } else {
        history.push(mainPath);
      }
      //eslint-disable-next-line
    };

    getUser();
  }, []);

  return user && <div className='is-logged'> </div>;
};

const stateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};
export default connect(stateToProps, { login, adminLogin })(IsLogged);
