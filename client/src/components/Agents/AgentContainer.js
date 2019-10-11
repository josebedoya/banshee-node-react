import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import { fetchAgents, updateAgent } from '../../redux/actions/agents-actions';
import { getAgentById } from '../../redux/reducers/agents-reducer';
import AgentForm from './AgentForm';

import * as notify from './../../lib/alerts';

class AgentContainer extends Component {
  componentDidMount() {
    if (this.props.agents.data.length === 0) {
      this.props.fetchAgents();
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
    const { updateAgent } = this.props;
    updateAgent(id, values);
  };

  // handleOnDelete = (id) => {
  //   const { deleteUser, history } = this.props;
  //   deleteUser(id);
  //   history.goBack();
  // }

  handleOnBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  renderControl = (isEdit, isDelete) => {
    const { agent, agents } = this.props;
    if (agent) {
      return (
        <AgentForm
          {...agent}
          onSubmit={this.handleSubmit}
          onBack={this.handleOnBack}
          onDelete={this.handleOnDelete}
          isUpdating={agents.isUpdating}
          isEdit={!!isEdit}
          isDeleteAllow={!!isDelete}
        />
      );
    }
    return null;
  };

  renderBody = () => (
    <Route
      path='/app/agents/:id/edit'
      children={
        // eslint-disable-line
        ({ match: isEdit }) => (
          <Route
            path='/app/agents/:id/delete'
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
            <h2>View / edit agent</h2>
          </div>
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

AgentContainer.propTypes = {
  id: PropTypes.string.isRequired,
  fetchAgents: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    agent: getAgentById(state, props),
    agents: state.agents,
    alert: state.alert
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchAgents,
      updateAgent
    }
  )(AgentContainer)
);
