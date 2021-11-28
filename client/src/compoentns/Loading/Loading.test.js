import React from 'react'
import ReactDOM from 'react-dom'
import Loading from './Loading'

it('render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Loading />, div)

  ReactDOM.unmountComponentAtNode(div)
})
