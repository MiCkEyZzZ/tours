import React from 'react'
import { Link } from 'react-router-dom'

import './Breadcrumb.css'
import i18n from '../../i18n'

const Breadcrumb = ({ name }) => {
  const baseUrl = i18n.language === 'en' ? '' : '/' + i18n.language

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to={ baseUrl + "/tours" }>Маршруты</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          { name.name }
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumb
