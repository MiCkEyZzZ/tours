import React from 'react'

import './Button.css'

const Button = ({ type, title, onClick, icon }) => {
  return (
    <button
      type={ type }
      className="btn-nt"
      onClick={ onClick }
    >{ title? title : icon }</button>
  )
}

export default Button
