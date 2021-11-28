import React from 'react'
import ReactDOM from 'react-dom'
import SelectFilter from './Select'

it('render without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SelectFilter />, div)

  ReactDOM.unmountComponentAtNode(div)
})
