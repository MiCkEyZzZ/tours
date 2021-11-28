import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button, DropMenu } from '../index'
import { links, moonIcon, sunIcon } from '../../utils/common'
import { logOut } from '../../store/actions/authAction'
import picture from '../../assets/default.jpg'
import i18n from '../../i18n'

import './Header.css'

const Header = () => {
  const { t } = useTranslation()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isDropMenu, setIsDropMenu] = useState(false)
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()
  const baseUrl = i18n.language === 'en' ? '' : '/' + i18n.language

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleDropMenu = () => {
    setIsDropMenu(!isDropMenu)
  }

  const onSelectItemPageLoader = useCallback(() => {

  }, [])

  const handleLogOut = () => {
    dispatch(logOut())

    history.push('/')
  }

  const renderLinks = () => {
    return links.map((link, i) => {
      return (
        <li
          key={i}
          className="navbar-list-item"
        >
          <NavLink
            to={ baseUrl + link.to }
            exact={ link.exact }
            className="nav-link"
            activeClassName='active'
          >{ t(link.label) }</NavLink>
        </li>
      )
    })
  }

  return (
    <div className="header">
      <nav className='navbar'>
        <div className="navbar-wrapper">
          <Link className="navbar-brand" to={ baseUrl + "/" }>Navbar</Link>
          <div className="navbar-menu">
            <ul className="navbar-list">
              { renderLinks() }
            </ul>
            <ul className="navbar-list">
              <li className="navbar-list-item">
                <DropMenu
                  isDropMenu={ isDropMenu }
                  setIsDropMenu={ setIsDropMenu }
                  onClickSelectLanguageType={ onSelectItemPageLoader }
                  onClickMenu={ toggleDropMenu }
                />
              </li>
              {!isDarkMode ? <li className="navbar-list-item navbar-list-item--check">
                <Button
                  icon={ sunIcon }
                  className="nav-link"
                  onClick={ toggleDarkMode }
                />
              </li> : <li className="navbar-list-item navbar-list-item--check">
                <Button
                  icon={ moonIcon }
                  className="nav-link"
                  onClick={ toggleDarkMode }
                />
              </li> }
              {isAuthenticated &&
              <li className="navbar-list-item">
                <Button
                  title={t('header.linkSix')}
                  className="nav-link"
                  onClick={handleLogOut}
                />
              </li>
              }
              {!isAuthenticated &&<li className="navbar-list-item">
                <Link
                  to={baseUrl + '/login'}
                  className="nav-link"
                >{t('header.linkFour')}</Link>
              </li>
              }
              {!isAuthenticated && <li className="navbar-list-item">
                <Link
                  to={baseUrl + '/registration'}
                  className="nav-link"
                >{t('header.linkFive')}</Link>
              </li>
              }
              {isAuthenticated && <li className="navbar-list-item">
                <Link
                  className="nav-link"
                  to={baseUrl + "/profile"}
                >
                  <img
                    className='nav-link-img'
                    src={ picture }
                    style={ { width: '2.0rem', height: '2.0rem' } }
                    alt={user.name}
                  />
                  <span className="nav-link-nickname">{ user.name }</span>
                </Link>
              </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
