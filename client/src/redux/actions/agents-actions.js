// Action definition
export const FETCH_AGENTS = 'FETCH_AGENTS';
export const FETCH_AGENTS_SUCCESS = 'FETCH_AGENTS_SUCCESS';
export const FETCH_AGENTS_ERROR = 'FETCH_AGENTS_ERROR';

export const INSERT_AGENT = 'INSERT_AGENT';
export const INSERT_AGENT_SUCCESS = 'INSERT_AGENT_SUCCESS';
export const INSERT_AGENT_ERROR = 'INSERT_AGENT_ERROR';

export const UPDATE_AGENT = 'UPDATE_AGENT';
export const UPDATE_AGENT_SUCCESS = 'UPDATE_AGENT_SUCCESS';
export const UPDATE_AGENT_ERROR = 'UPDATE_AGENT_ERROR';

export const DELETE_AGENT = 'DELETE_AGENT';
export const DELETE_AGENT_SUCCESS = 'DELETE_AGENT_SUCCESS';
export const DELETE_AGENT_ERROR = 'DELETE_AGENT_ERROR';

// Action creators
export const fetchAgents = () => ({
  type: FETCH_AGENTS
});

export const insertAgent = agent => ({
  type: INSERT_AGENT,
  agent
});

export const updateAgent = (id, agent) => ({
  type: UPDATE_AGENT,
  id,
  agent
});

export const deleteAgent = id => ({
  type: DELETE_AGENT,
  id
});
