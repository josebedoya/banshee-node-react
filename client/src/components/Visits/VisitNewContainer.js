import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import VisitForm from './VisitForm';

import { insertVisit, fetchVisits } from './../../redux/actions/visits-actions';
import { fetchClients } from './../../redux/actions/clients-actions';
import { fetchAgents } from './../../redux/actions/agents-actions';
import { getClientById } from '../../redux/reducers/clients-reducer';

import * as notify from './../../lib/alerts';

class VisitNewContainer extends Component {
  componentDidMount() {
    const {
      visits,
      fetchVisits,
      clients,
      fetchClients,
      agents,
      fetchAgents
    } = this.props;
    if (visits.data.length === 0) {
      fetchVisits();
    }
    if (clients.data.length === 0) {
      fetchClients();
    }
    if (agents.data.length === 0) {
      fetchAgents();
    }
  }

  componentDidUpdate(prevProps) {
    const { alert } = this.props;
    if (prevProps.alert !== alert) {
      notify.showAlert(alert);
    }
  }

  handleSubmit = values => {
    this.props.insertVisit(values);
  };

  handleOnBack = () => {
    this.props.history.goBack();
  };

  renderBody = () => {
    const { isUpdating, agents, client } = this.props;
    let agentsTransf;
    if (agents.data) {
      agentsTransf = agents.data.map(agent => ({
        key: agent.id,
        value: agent.name
      }));
    }
    let available = client.available_credit.slice(0, -3);
    return (
      <VisitForm
        onSubmit={this.handleSubmit}
        onBack={this.handleOnBack}
        isEdit={false}
        clientId={client.id}
        visits_percentage={client.visits_percentage}
        available_credit={Number(available)}
        isUpdating={isUpdating}
        agents={agentsTransf}
      />
    );
  };

  render() {
    const { client } = this.props;
    return (
      <div className='component'>
        <div>
          <div className='content-heading'>
            <h2>Add new visit for {client.fullname}</h2>
            <Link
              to={`/app/clients/${client.id}/edit`}
              style={{ color: '#FFF' }}
            >
              See client info
            </Link>
          </div>
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

VisitNewContainer.propTypes = {
  isUpdating: PropTypes.bool,
  insertVisit: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  client: getClientById(state, props),
  isUpdating: state.visits.isUpdating,
  visits: state.visits,
  clients: state.clients,
  agents: state.agents,
  alert: state.alert
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      insertVisit,
      fetchVisits,
      fetchClients,
      fetchAgents
    }
  )(VisitNewContainer)
);
