import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ClientForm from './ClientForm';

import {
  insertClient,
  fetchClients
} from './../../redux/actions/clients-actions';

import * as notify from './../../lib/alerts';

class ClientNewContainer extends Component {
  componentDidMount() {
    const { clients, fetchClients } = this.props;
    if (clients.data.length === 0) {
      fetchClients();
    }
  }

  componentDidUpdate(prevProps) {
    const { alert } = this.props;
    if (prevProps.alert !== alert) {
      notify.showAlert(alert);
    }
  }

  handleSubmit = values => {
    this.props.insertClient(values);
  };

  handleOnBack = () => {
    this.props.history.goBack();
  };

  renderBody = () => {
    const { isUpdating } = this.props;
    return (
      <ClientForm
        onSubmit={this.handleSubmit}
        onBack={this.handleOnBack}
        isEdit={false}
        isUpdating={isUpdating}
      />
    );
  };

  render() {
    return (
      <div className='component'>
        <div>
          <div className='content-heading'>
            <h2>Add new client</h2>
          </div>
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

ClientNewContainer.propTypes = {
  isUpdating: PropTypes.bool,
  insertClient: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isUpdating: state.clients.isUpdating,
  clients: state.clients,
  alert: state.alert
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      insertClient,
      fetchClients
    }
  )(ClientNewContainer)
);
