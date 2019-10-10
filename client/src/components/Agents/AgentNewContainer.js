import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AgentForm from './AgentForm';

import { insertAgent, fetchAgents } from './../../redux/actions/agents-actions';

import * as notify from './../../lib/alerts';

class AgentNewContainer extends Component {
  componentDidMount() {
    const { agents, fetchAgents } = this.props;
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
    this.props.insertAgent(values);
  };

  handleOnBack = () => {
    this.props.history.goBack();
  };

  renderBody = () => {
    const { isUpdating } = this.props;
    return (
      <AgentForm
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
            <h2>Add new agent</h2>
          </div>
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

AgentNewContainer.propTypes = {
  isUpdating: PropTypes.bool,
  insertAgent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isUpdating: state.agents.isUpdating,
  agents: state.agents,
  alert: state.alert
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      insertAgent,
      fetchAgents
    }
  )(AgentNewContainer)
);
