import React from 'react'
import { useTranslation } from 'react-i18next'

import './Total.css'
const totalIcon = (
  <svg width="24" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.4 4.8a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z" fill="#6B6A72"/><path d="M2.4 13.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z" fill="#6E6D7A"/><path d="M2.4 21.6a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8ZM9.6 3.6h13.2a1.2 1.2 0 1 0 0-2.4H9.6a1.2 1.2 0 0 0 0 2.4ZM22.8 9.6H9.6a1.2 1.2 0 1 0 0 2.4h13.2a1.2 1.2 0 0 0 0-2.4ZM22.8 18H9.6a1.2 1.2 0 1 0 0 2.4h13.2a1.2 1.2 0 1 0 0-2.4Z" fill="#6B6A72"/></svg>
)

const Total = () => {
  const { t } = useTranslation()

  return (
    <div className='total'>
      <i className="total-icon">{ totalIcon }</i>
      <p className='total-title'>{t('tour.total')}</p>
    </div>
  )
}

export default Total
