import { TOUR_REQUEST, TOUR_SUCCESS, TOUR_FAILURE } from '../types'

const initialState = {
  tour: {},
  loading: false,
  error: null
}

const tourReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOUR_REQUEST:
      return {...state, tour: {}, loading: true, error: null}
    case TOUR_SUCCESS:
      return {...state, tour: action.payload, loading: false, error: null}
    case TOUR_FAILURE:
      return {...state, tour: {}, loading: false, error: action.payload}
    default:
      return state
  }
}

export default tourReducer
