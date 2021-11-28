import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT
} from "../types"

const initialState = {
  user: {},
  loading: false,
  isAuthenticated: false,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {...state, user: {}, loading: true, isAuthenticated: false, error: null}
    case REGISTER_SUCCESS:
      return {...state, user: action.payload, loading: false, isAuthenticated: false, error: null}
    case REGISTER_FAILURE:
      return {...state, user: {}, loading: false, isAuthenticated: false, error: action.payload}
    case LOGIN_REQUEST:
      return {...state, user: {}, loading: true, isAuthenticated: false, error: null}
    case LOGIN_SUCCESS:
      return {...state, user: action.payload, loading: false, isAuthenticated: true, error: null}
    case LOGIN_FAILURE:
      return {...state, user: {}, loading: false, isAuthenticated: false, error: action.payload}
    case LOGOUT:
      return {...state, user: {}, loading: false, isAuthenticated: false, error: null}
    default:
      return state
  }
}

export default authReducer
