import React from 'react'
import ReactPaginate from 'react-paginate'

import './Pagination.css'

const Pagination = (
  {
    previousLabel,
    nextLabel,
    pageCount,
    containerClassName,
    activeClassName
  }) => {
  return (
    <div>
      <nav aria-label="pagination-container">
        <ReactPaginate
          previousLabel={ previousLabel }
          nextLabel={ nextLabel }
          pageCount={ pageCount }
          containerClassName={ containerClassName }
          activeClassName={ activeClassName }
        />
      </nav>
    </div>
  )
}

export default Pagination
