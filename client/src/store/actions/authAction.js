import axios from 'axios'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  REGISTER_REQUEST
} from '../types'
import { URL } from '../../consts/index'

export const fetchAuthRegistration = (info) => async dispatch => {
  try {
    dispatch({type: REGISTER_REQUEST})
    const { data } = await axios.post(`${URL}/api/v1/users/signup`, info)

    dispatch({type: REGISTER_SUCCESS, payload: data.message})
  } catch (err) {
    dispatch({type: REGISTER_FAILURE, payload: err.message})
  }
}

export const fetchAuthLogin = (form) => async dispatch => {
  try {
    dispatch({type: LOGIN_REQUEST})
    const { data } = await axios.post(`${URL}/api/v1/users/login`, form)

    dispatch({type: LOGIN_SUCCESS, payload: data.user})

    localStorage.setItem('userData', JSON.stringify({
      token: data.token
    }))
  } catch (err) {
    dispatch({type: LOGIN_FAILURE, payload: err.message})
  }
}

export const logOut = () => async dispatch => {
  dispatch({type: LOGOUT})
  localStorage.removeItem('userData')
}
