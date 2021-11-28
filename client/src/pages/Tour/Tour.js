import React, { useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './Tour.css'

import { Loading, Button, ReviewCard, DashInfo, Breadcrumb, PictureCard } from '../../compoentns'
import { fetchTour } from '../../store/actions/tourAction'

const Tour = () => {
  const { id } = useParams()
  const { tour, loading } = useSelector(state => state.tour)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTour(id))
  }, [])

  return (
    <main className='tour pb-5 pt-5'>
      { loading ? <Loading /> : <div className='tour-wrapper'>
        <Breadcrumb name={ tour } />
        <div className="tour-card">
          <div className="tour-image">
            <img
              src={ tour.imageCover }
              alt={ tour.name }
              className="tour-image-top"
            />
          </div>
          <div className="tour-card__body">
            <h5 className="card-title">{ tour.name }</h5>
            <p className="card-title__text">{ tour.description }</p>

            <DashInfo tour={ tour } />

            <div className='tour-picture'>
              {tour.images && tour.images.map((img, i) => {
                return (
                  <PictureCard key={i} img={ img } />
                )
              })}
            </div>

            <div className="tour-review">
              <ul className="tour-review-list">
                {tour.reviews && tour.reviews.map((review) => {
                  return (
                      <ReviewCard key={ review.id } review={ review } />
                  )
                })}
              </ul>
            </div>

            <div className="tour-group">
              <NavLink
                  to='/booking'
                  className='tour-booking'
              >Заказать</NavLink>
            </div>
          </div>
        </div>
      </div>}
    </main>
  )
}

export default Tour
