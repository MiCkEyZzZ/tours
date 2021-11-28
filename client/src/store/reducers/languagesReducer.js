import { SELECT_LANGUAGES } from '../types'

const initialState = {
  languages: [
    { id: 2, title: 'DE', type: 'de', idx: 'de' },
    { id: 3, title: 'EN', type: 'en', idx: 'en' },
    { id: 5, title: 'FR', type: 'fr', idx: 'fr' },
    { id: 9, title: 'RU', type: 'ru', idx: 'ru' }
  ]
}

const languagesReducer = (state = initialState, action) => {
  switch(action.type) {
    case SELECT_LANGUAGES:
      return {...state, languages: []}
    default:
      return state
  }
}

export default languagesReducer
