import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { convertWorld, currency, makeShortTourDescription } from '../../utils/common'

import './ProductList.css'

const ProductList = ({ tours }) => {
  const { t } = useTranslation()

  const renderProducts = Object.values(tours).map(tour => {
    return (
      <div
        key={ tour.id }
        className='product'
      >
        <div className="product-picture">
          <img className="product-picture-img" src={`/tours/${ tour.imageCover }`} alt={ tour.name } />
        </div>
        <div className="product-body">
          <h5 className="product-title">{ tour.name }</h5>
          <p
            className="product-title-text"
          >{ makeShortTourDescription(tour.summery) }</p>
          <ul className="product-list">
            <li className="product-list-item">{ t('product.rating') }:&nbsp;&nbsp;{ tour.ratingsAverage } / { tour.ratingsQuantity }</li>
            <li className="product-list-item">{ t('product.size') }:&nbsp;&nbsp;{ tour.maxGroupSize } человек</li>
            <li className="product-list-item">{ t('product.duration') }:&nbsp;&nbsp;{ tour.duration } дней</li>
            <li className="product-list-item">{ t('product.level') }:&nbsp;&nbsp;{ convertWorld(tour.difficulty) }</li>
            <li className="product-list-item">{ t('product.location') }:&nbsp;&nbsp;{ tour.startLocation.description }</li>
          </ul>
        </div>

        <div className="product-footer">
          <NavLink
            to={ `/tours/${ tour.id }` }
            className="btn-link"
          >{ t('product.moreBtn') }</NavLink>
          <p className="product-footer-price"><output>{ currency(tour.price) }</output></p>
        </div>
      </div>
    )
  })

  return (
    <div className='product-list'>{ renderProducts }</div>
  )
}

export default ProductList
