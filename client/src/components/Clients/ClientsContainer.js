import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';

import {
  fetchClients,
  deleteClient
} from './../../redux/actions/clients-actions';

import * as notify from './../../lib/alerts';

import ClientsList from './ClientsList';

const { confirm } = Modal;

class ClientsContainer extends Component {
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

  handleAddNew = () => {
    this.props.history.push('/app/clients/new');
  };

  confirmDelete = (id, fullname) => {
    const { deleteClient } = this.props;
    confirm({
      title: 'Do you want to delete this client?',
      content: `${fullname}`,
      onOk() {
        deleteClient(id);
      },
      onCancel() {}
    });
  };

  render() {
    const { clients } = this.props;
    return (
      <div className='component'>
        <div>
          <div className='content-heading'>
            <h2>Clients</h2>
          </div>
          <ClientsList
            data={clients.data}
            confirmDelete={this.confirmDelete}
            isFetching={clients.isFetching}
          />
          <Button type='primary' htmlType='button' onClick={this.handleAddNew}>
            Add a new client
          </Button>
        </div>
      </div>
    );
  }
}

ClientsContainer.propTypes = {
  fetchClients: PropTypes.func,
  deleteClients: PropTypes.func,
  clients: PropTypes.object
};

const mapStateToProps = state => ({
  clients: state.clients,
  alert: state.alert
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchClients,
      deleteClient
    }
  )(ClientsContainer)
);
