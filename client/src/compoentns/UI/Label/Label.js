import React from 'react'

import './Label.css'

const Label = ({ htmlFor, title }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="label mb-1"
    >{ title }</label>
  )
}

export default Label
