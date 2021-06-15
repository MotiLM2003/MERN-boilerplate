import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../components/Login/Login';
import UserLogin from '../components/Login/UserLogin';
import Register from '../components/Login/Register';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Header from '../components/Secured/Header/Header';
import Dashboard from '../components/Secured/Dashboard/Dashboard';

import Manage from '../components/Secured/Manage/Manage';
import Planning from '../components/Secured/Planning/Planning';
import OptionsMenu from '../components/Secured/Menu/OptionsMenu';

import BackToTop from '../components/BackToTop/BackToTop';
import IsLogged from '../components/IsLogged/IsLogged';
import Reports from '../components/Secured/Manage/Reports/Reports';

const AppRouter = ({ isAuthenticated, isCustomerAuth }) => {
  const location = useLocation();

  const authRender = () => {
    console.log('auth router');
    return (
      <div className='secured-container'>
        <Header />
        <div className='secured-container__main-content'>
          <OptionsMenu />
          <BackToTop />
          <div className='private-route-container'>
            <Switch location={location} key={location.key}>
              <PublicRoute exact path='/backoffice' component={Login} />
              <Route exact path='/register' component={Register} />
              <PrivateRoute
                path='/backoffice/dashboard'
                component={Dashboard}
              />
              <PrivateRoute exact path='/planning' component={Planning} />

              <PrivateRoute
                exact
                path='/backoffice/manage/'
                component={Manage}
              />

              <PrivateRoute path='/backoffice/reports' component={Reports} />
            </Switch>
          </div>
        </div>
      </div>
    );
  };

  const publicRender = () => {
    console.log('public router');
    return (
      <Switch location={location} key={location.key}>
        <PublicRoute exact path='/' component={UserLogin} />
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
        <PublicRoute exact path='/backoffice' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute path='/backoffice/dashboard' component={Dashboard} />
        <Route path='*' exact={true} component={IsLogged} />
      </Switch>
    );
  };

  return isAuthenticated ? authRender() : publicRender();
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    isAuthenticated: !!state.userReducer._id,
    isCustomerAuth: !!state.customerReducer._id,
    customer: state.customer,
  };
};

export default connect(mapStateToProps)(AppRouter);
