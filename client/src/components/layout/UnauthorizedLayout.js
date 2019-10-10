import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Pages
import LoginPage from '../Login/LoginPage';

class UnauthorizedLayout extends Component {
  render() {
    const { auth } = this.props;
    if (auth.isAuthenticated) {
      return <Redirect to='/app' />;
    }

    return (
      <div className='unauthorized-layout'>
        <Switch>
          <Route path='/auth/login' component={LoginPage} />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    );
  }
}

UnauthorizedLayout.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(UnauthorizedLayout));
