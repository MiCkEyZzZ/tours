import React from 'react'

import './Input.css'

const Input = (
  {
     type,
     id,
     name,
     autoComplete,
     placeholder,
     value,
     onChangeInput
}
) => {

  return (
    <input
      id={ id }
      type={ type }
      value={ value }
      name={ name }
      className="input"
      placeholder={ placeholder }
      autoComplete={ autoComplete }
      onChange={ onChangeInput }
    />
  )
}

export default Input
