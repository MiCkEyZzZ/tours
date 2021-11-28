import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import {
    About,
    Profile,
    Home,
    Tour,
    Tours,
    Login,
    Registration,
    Booking,
    Contacts
} from './pages'

export const useRoutes = isAuthenticated => {
  const baseRouteUrl = '/:locale(en|ru|fr|de)?'

  if (isAuthenticated) {
    return (
      <Switch>
        <Route path={ baseRouteUrl + '/' } exact>
          <Home />
        </Route>
        <Route path={ baseRouteUrl + '/about' } exact>
          <About />
        </Route>
        <Route path={ baseRouteUrl + '/tours' } exact>
          <Tours />
        </Route>
        <Route path={ baseRouteUrl + '/profile' } exact>
          <Profile />
        </Route>
        <Route path={ baseRouteUrl + '/tours/:id' } exact>
          <Tour />
        </Route>
        <Route path={ baseRouteUrl + '/booking' } exact>
          <Booking />
        </Route>
        <Route path={ baseRouteUrl + '/contacts' } exact>
          <Contacts />
        </Route>
        <Redirect to={ baseRouteUrl + '/' } />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path={ baseRouteUrl + '/' } exact>
        <Home />
      </Route>
      <Route path={ baseRouteUrl + '/about' } exact>
        <About />
      </Route>
      <Route path={ baseRouteUrl + '/tours' } exact>
        <Tours />
      </Route>
      <Route path={ baseRouteUrl + '/tours/:id' } exact>
        <Tour />
      </Route>
      <Route path={ baseRouteUrl + '/login' } exact>
        <Login />
      </Route>
      <Route path={ baseRouteUrl + '/registration' } exact>
        <Registration />
      </Route>
      <Route path={ baseRouteUrl + '/contacts' } exact>
        <Contacts />
      </Route>
      <Redirect to={ baseRouteUrl + '/login' } />
    </Switch>
  )
}
