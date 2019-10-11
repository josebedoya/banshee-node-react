import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import {
  fetchClients,
  updateClient
} from '../../redux/actions/clients-actions';
import { getClientById } from '../../redux/reducers/clients-reducer';
import ClientForm from './ClientForm';

import * as notify from './../../lib/alerts';

class ClientContainer extends Component {
  componentDidMount() {
    if (this.props.clients.data.length === 0) {
      this.props.fetchClients();
    }
  }

  componentDidUpdate(prevProps) {
    const { alert } = this.props;
    if (prevProps.alert !== alert) {
      notify.showAlert(alert);
    }
  }

  handleSubmit = values => {
    const { id } = values;
    const { updateClient } = this.props;
    updateClient(id, values);
  };

  handleOnBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  renderControl = (isEdit, isDelete) => {
    const { client, clients } = this.props;
    if (client) {
      return (
        <ClientForm
          {...client}
          onSubmit={this.handleSubmit}
          onBack={this.handleOnBack}
          onDelete={this.handleOnDelete}
          isUpdating={clients.isUpdating}
          isEdit={!!isEdit}
          isDeleteAllow={!!isDelete}
        />
      );
    }
    return null;
  };

  renderBody = () => (
    <Route
      path='/app/clients/:id/edit'
      children={
        // eslint-disable-line
        ({ match: isEdit }) => (
          <Route
            path='/app/clients/:id/delete'
            children={
              // eslint-disable-line
              ({ match: isDelete }) => this.renderControl(isEdit, isDelete)
            }
          />
        )
      }
    />
  );

  render() {
    return (
      <div className='component'>
        <div>
          <div className='content-heading'>
            <h2>View / edit client</h2>
          </div>
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

ClientContainer.propTypes = {
  id: PropTypes.string.isRequired,
  fetchClients: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    client: getClientById(state, props),
    clients: state.clients,
    alert: state.alert
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchClients,
      updateClient
    }
  )(ClientContainer)
);
