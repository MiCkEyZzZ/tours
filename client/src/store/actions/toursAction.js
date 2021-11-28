import axios from 'axios'
import {
  TOURS_REQUEST,
  TOURS_SUCCESS,
  TOURS_FAILURE
} from '../types'

import { URL } from '../../consts/index'

export const fetchTours = (page, limit) => async dispatch => {
  try {
    dispatch({type: TOURS_REQUEST})
    const { data } = await axios.get(`${URL}/api/v1/tours?page=${page}&limit=${limit}`)
    const { doc } = data
    dispatch({type: TOURS_SUCCESS, payload: doc})
  } catch (err) {
    dispatch({type: TOURS_FAILURE, payload: err.message})
  }
}
