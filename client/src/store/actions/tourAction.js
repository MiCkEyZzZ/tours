import axios from 'axios'
import { TOUR_REQUEST, TOUR_SUCCESS, TOUR_FAILURE } from '../types'

import { URL } from '../../consts/index'

export const fetchTour = (id) => async dispatch => {
  try {
    dispatch({type: TOUR_REQUEST})
    const { data } = await axios.get(`${URL}/api/v1/tours/${id}`)
    dispatch({type: TOUR_SUCCESS, payload: data.doc})
  } catch (err) {
    dispatch({type: TOUR_FAILURE, payload: err.message})
  }
}
