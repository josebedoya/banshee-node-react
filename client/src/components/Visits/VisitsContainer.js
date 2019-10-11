import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';

import { fetchClients } from './../../redux/actions/clients-actions';
import { fetchVisits, deleteVisit } from './../../redux/actions/visits-actions';
import { getClientById } from '../../redux/reducers/clients-reducer';

import * as notify from './../../lib/alerts';

import VisitsList from './VisitsList';

const { confirm } = Modal;

class VisitsContainer extends Component {
  componentDidMount() {
    if (this.props.visits.data.length === 0) {
      this.props.fetchVisits();
    }
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
    this.props.history.push(`/app/visits-client/${this.props.client.id}/new`);
  };

  confirmDelete = (id, name) => {
    const { deleteVisit } = this.props;
    confirm({
      title: 'Do you want to delete this visit?',
      content: `${name}`,
      onOk() {
        deleteVisit(id);
      },
      onCancel() {}
    });
  };

  render() {
    const { visits, client } = this.props;
    return (
      <div className='component'>
        <div>
          <div className='content-heading'>
            <h2>Visits for {client.fullname}</h2>
            <Link
              to={`/app/clients/${client.id}/edit`}
              style={{ color: '#FFF' }}
            >
              See client info
            </Link>
          </div>
          <VisitsList
            data={visits.data}
            confirmDelete={this.confirmDelete}
            isFetching={visits.isFetching}
          />
          <Button type='primary' htmlType='button' onClick={this.handleAddNew}>
            Add a new visit
          </Button>
        </div>
      </div>
    );
  }
}

VisitsContainer.propTypes = {
  fetchVisits: PropTypes.func,
  deleteVisits: PropTypes.func,
  visits: PropTypes.object
};

const mapStateToProps = (state, props) => ({
  client: getClientById(state, props),
  clients: state.clients,
  visits: state.visits,
  alert: state.alert
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchVisits,
      fetchClients,
      deleteVisit
    }
  )(VisitsContainer)
);
