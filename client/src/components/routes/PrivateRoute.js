import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render() {
    const {
      component: Component,
      auth: { isAuthenticated },
      ...rest
    } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: '/auth/login', state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
}

PrivateRoute.propTypes = {
  //component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
