import {
  TOURS_REQUEST,
  TOURS_SUCCESS,
  TOURS_FAILURE
} from '../types'

const initialState = {
  tours: [],
  loading: false,
  error: null
}

const toursReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOURS_REQUEST:
      return {...state, tours: [], loading: true, error: null}
    case TOURS_SUCCESS:
      return {...state, tours: action.payload, loading: false, error: null}
    case TOURS_FAILURE:
      return {...state, tours: [], loading: false, error: action.payload}
    default:
      return state
  }
}

export default toursReducer
