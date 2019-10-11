import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';

import { fetchAgents, deleteAgent } from './../../redux/actions/agents-actions';

import * as notify from './../../lib/alerts';

import AgentsList from './AgentsList';

const { confirm } = Modal;

class AgentsContainer extends Component {
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

  handleAddNew = () => {
    this.props.history.push('/app/agents/new');
  };

  confirmDelete = (id, name) => {
    const { deleteAgent } = this.props;
    confirm({
      title: 'Do you want to delete this item?',
      content: `${name}`,
      onOk() {
        deleteAgent(id);
      },
      onCancel() {}
    });
  };

  render() {
    const { agents } = this.props;
    return (
      <div className='component'>
        <div>
          <div className='content-heading'>
            <h2>Agents</h2>
          </div>
          <AgentsList
            data={agents.data}
            confirmDelete={this.confirmDelete}
            isFetching={agents.isFetching}
          />
          <Button type='primary' htmlType='button' onClick={this.handleAddNew}>
            Add a new agent
          </Button>
        </div>
      </div>
    );
  }
}

AgentsContainer.propTypes = {
  fetchAgents: PropTypes.func,
  deleteAgents: PropTypes.func,
  agents: PropTypes.object
};

const mapStateToProps = state => ({
  agents: state.agents,
  alert: state.alert
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchAgents,
      deleteAgent
    }
  )(AgentsContainer)
);
