import authReducer from './authReducer'
import toursReducer from './toursRedux'
import tourReducer from './tourReducer'
import languagesReducer from './languagesReducer'

const reducers = {
  auth: authReducer,
  tours: toursReducer,
  tour: tourReducer,
  lang: languagesReducer
}

export default reducers
