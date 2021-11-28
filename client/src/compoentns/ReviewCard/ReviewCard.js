import React from 'react'

import './ReviewCard.css'

const ReviewCard = ({ review }) => {
  return (
    <div className="review">
      <div className="review-wrapper">
        <img src={ `/users/${review.user.photo}` } className="review-img" alt={ review.user.name } />
        <div className="review-info">
          <h5 className="review-info-title">{ review.user.name }</h5>
          <p className="review-info-text">{ review.review }</p>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
