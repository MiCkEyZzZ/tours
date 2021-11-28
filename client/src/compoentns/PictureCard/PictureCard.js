import React from 'react'

import './PictureCard.css'

const PictureCard = ({ img }) => {
  return (
    <div className="picture" style={{ border: 'none' }}>
      <img key={ img } src={ img } className="picture-img" alt={ img.name } />
    </div>
  )
}

export default PictureCard
