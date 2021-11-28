import React from 'react'

import './DashInfo.css'

import { convertWorld, currencyDate } from '../../utils/common'

const DashInfo = ({ tour }) => {
  return (
    <div className="dash">
      <div className="dash-block">
        <h5 className='dash-block__title'>Информация по маршруту</h5>
        <div className="dash-block__group">
          <span className='dash-block__group__text'>ДАТА</span>
          <span className='dash-block__group__muted'>{ currencyDate(1) }</span>
        </div>
        <div className="dash-block__group">
          <span className='dash-block__group__text'>УРОВЕНЬ</span>
          <span className='dash-block__group__muted'>{ convertWorld(tour.difficulty) }</span>
        </div>
        <div className="dash-block__group">
          <span className='dash-block__group__text'>УЧАТНИКОВ</span>
          <span className='dash-block__group__muted'>{ tour.maxGroupSize } человек</span>
        </div>
        <div className="dash-block__group">
          <span className='dash-block__group__text'>РЕЙТИНГ</span>
          <span className='dash-block__group__muted'>{ tour.ratingsAverage } / { tour.ratingsQuantity }</span>
        </div>
      </div>
      <div className="dash-block">
        <h5 className='dash-block__title'>Гиды по маршруту</h5>
        <div className="dash-block__group">
          <span className='dash-block__group__text'>ВЕДУЩИЙ ГИД</span>
          <span className='dash-block__group__muted'>Miyah Myles</span>
        </div>
        <div className="dash-block__group">
          <span className='dash-block__group__text'>ТУР ГИД</span>
          <span className='dash-block__group__muted'>Jennifer Hardy</span>
        </div>
      </div>
    </div>
  )
}

export default DashInfo
