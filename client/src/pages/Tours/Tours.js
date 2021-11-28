import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Filter, Pagination, ProductList, Loading, Total } from '../../compoentns'
import { fetchTours } from '../../store/actions/toursAction'

import './tours.css'

const Tours = () => {
  const { t } = useTranslation()
  const { tours, loading } = useSelector(state => state.tours)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTours(1, 12))
  }, [])

  return (
    <main className='tours'>
      <h1 className='tours-title'>{t('tour.title')}</h1>
      <Filter />
      {!loading ? <Total /> : null}
      {loading ? <Loading /> : <ProductList tours={ tours } />}
      {!loading
        ? <Pagination
            previousLabel={t('pagination.prev')}
            nextLabel={t('pagination.next')}
            pageCount={ tours.length }
            containerClassName={'pagination'}
            activeClassName={'active'}
        />
        : null
      }
    </main>
  )
}

export default Tours

