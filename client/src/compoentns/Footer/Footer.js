import React from "react"
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import './Footer.css'

import i18n from '../../i18n'

const Footer = () => {
  const { t } = useTranslation()
  const baseUrl = i18n.language === 'en' ? '' : '/' + i18n.language

  return (
    <footer className='footer' style={{ width: '100%'}}>
      <div className='footer-wrapper'>
        <p className='footer-copyright'>© 2021 · {t('footer.copyRight')}</p>
        <ul className="footer-nav__list">
          <li className="footer-nav__list-item">
            <Link className="footer-nav__list-item--link" aria-current="page" to={baseUrl + "/about"}>{t('footer.linkOne')}</Link>
          </li>
          <li className="footer-nav__list-item">
            <Link className="footer-nav__list-item--link" to={baseUrl + "/contacts"}>{t('footer.copyTwo')}</Link>
          </li>
          <li className="footer-nav__list-item">
            <Link className="footer-nav__list-item--link" to={baseUrl + "/popular"}>{t('footer.copyThree')}</Link>
          </li>
          <li className="footer-nav__list-item">
            <Link className="footer-nav__list-item--link" to={baseUrl + "/stock"}>{t('footer.copyFour')}</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
