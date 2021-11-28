import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import './DropMenu.css'

const DropMenu = (props) => {
  const { onClickMenu, isDropMenu, onClickSelectLanguageType, setIsDropMenu } = props
  const selectRef = useRef()
  const { languages } = useSelector((state) => state.lang)
  const { i18n } = useTranslation()

  const changeLanguage = (languages) => {
    i18n.changeLanguage(languages)
  }

  const onSelectItem = (i) => {
    if (onClickSelectLanguageType) {
      onClickSelectLanguageType(i)
    }
  }

  const handleOutsideClick = evt => {
    const path = evt.path || (evt.composedPath && evt.composedPath())

    if (!path.includes(selectRef.current)) {
      setIsDropMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  return (
    <div ref={selectRef} className='drop-menu'>
      <button
        className='drop-menu-btn'
        onClick={onClickMenu}
      >EN</button>
      { isDropMenu ? <div className="drop-menu-list">
        <ul className='drop-menu-list__items'>
          { languages.map(language => {
            return (
              <li
                key={ language.id }
                className='drop-menu-list__item'
                onClick={() => changeLanguage(language.idx)}
              >{ language.title }</li>
            )
          }) }
        </ul>
      </div> : null}
    </div>
  )
}

export default DropMenu
