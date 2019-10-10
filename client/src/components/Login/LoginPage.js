import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';

import { loginRequest } from './../../redux/actions/auth-actions';

import fnd from './../../assets/images/banshee-bg.jpg';

import * as notify from './../../lib/alerts';

class LoginPage extends Component {
  componentDidUpdate(prevProps) {
    const { alert } = this.props;
    if (prevProps.alert !== alert) {
      notify.showAlert(alert);
    }
  }

  handleSubmit = values => {
    this.props.dispatch(loginRequest(values));
  };

  render() {
    const { isLoginRequesting } = this.props;
    return (
      <div className='login-page' style={{ backgroundImage: `url(${fnd})` }}>
        <LoginForm
          onSubmit={this.handleSubmit}
          isLoginRequesting={isLoginRequesting}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  isLoginRequesting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoginRequesting: state.auth.loading,
  alert: state.alert
});

export default withRouter(connect(mapStateToProps)(LoginPage));
