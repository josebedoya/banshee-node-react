// Action definition
export const FETCH_VISITS = 'FETCH_VISITS';
export const FETCH_VISITS_SUCCESS = 'FETCH_VISITS_SUCCESS';
export const FETCH_VISITS_ERROR = 'FETCH_VISITS_ERROR';

export const INSERT_VISIT = 'INSERT_VISIT';
export const INSERT_VISIT_SUCCESS = 'INSERT_VISIT_SUCCESS';
export const INSERT_VISIT_ERROR = 'INSERT_VISIT_ERROR';

export const UPDATE_VISIT = 'UPDATE_VISIT';
export const UPDATE_VISIT_SUCCESS = 'UPDATE_VISIT_SUCCESS';
export const UPDATE_VISIT_ERROR = 'UPDATE_VISIT_ERROR';

export const DELETE_VISIT = 'DELETE_VISIT';
export const DELETE_VISIT_SUCCESS = 'DELETE_VISIT_SUCCESS';
export const DELETE_VISIT_ERROR = 'DELETE_VISIT_ERROR';

// Action creators
export const fetchVisits = () => ({
  type: FETCH_VISITS
});

export const insertVisit = visit => ({
  type: INSERT_VISIT,
  visit
});

export const updateVisit = (id, visit) => ({
  type: UPDATE_VISIT,
  id,
  visit
});

export const deleteVisit = id => ({
  type: DELETE_VISIT,
  id
});
