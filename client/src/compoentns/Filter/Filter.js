import React, { useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

import { Input, SelectFilter, Button, DatesPicker } from '../index'

import './Filter.css'

import { customStyles } from "../../utils/common"
import { priceOptions, reviewOptions, peopleOptions, durationOptions, difficultOptions } from '../../data'

const Filter = () => {
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange
  const { t } = useTranslation()
  const [tour, setTour] = useState('')

  const changeInput = (evt) => {
    setTour(evt.target.value)
  }

  const fetchSearchTour = async (evt) => {
    evt.preventDefault()
    const { data } = await axios.get(`http://localhost:8080/api/v1/tours?name=${ tour }`)
    console.log(data)
  }

  return (
    <div className="filter">
      <form className="filter-form" onSubmit={fetchSearchTour}>
        <div className="filter-search">
          <Input
            type="text"
            value={ tour }
            placeholder={ t('tour.placeholder') }
            onChangeInput={ changeInput }
          />
          <Button
            type='submit'
            title={t('tour.searchBtn')}
          />
        </div>
        <div className="filter-select">
          <SelectFilter
            options={ priceOptions }
            defaultValue={ priceOptions[0]}
            styles={ customStyles }
            display='flex'
            width='242px'
            height='51px'
            marginRight='15px'
            border='1px solid #e7e7e9'
            borderRadius='8px'
            cursor='pointer'
          />
          <SelectFilter
            options={ reviewOptions }
            defaultValue={ reviewOptions[0] }
            styles={ customStyles }
            display='flex'
            width='242px'
            height='51px'
            marginRight='15px'
            border='1px solid #e7e7e9'
            borderRadius='8px'
            cursor='pointer'
          />
          <SelectFilter
            options={ peopleOptions }
            defaultValue={ peopleOptions[0] }
            styles={ customStyles }
            display='flex'
            width='242px'
            height='51px'
            marginBottom='25px'
            border='1px solid #e7e7e9'
            borderRadius='8px'
            cursor='pointer'
          />
          <SelectFilter
            options={ durationOptions }
            defaultValue={ durationOptions[0] }
            styles={ customStyles }
            display='flex'
            width='242px'
            height='51px'
            marginRight='15px'
            marginTop='25px'
            border='1px solid #e7e7e9'
            borderRadius='8px'
            cursor='pointer'
          />
          <SelectFilter
            options={ difficultOptions }
            defaultValue={ difficultOptions[0] }
            styles={ customStyles }
            display='flex'
            width='242px'
            height='51px'
            marginRight='15px'
            marginTop='25px'
            border='1px solid #e7e7e9'
            borderRadius='8px'
            cursor='pointer'
          />
          <DatesPicker
            selectsRange={ true }
            dateFormat="dd-MM-yyyy"
            startDate={ startDate }
            endDate={ endDate }
            onChange={ (update) => setDateRange(update) }
            withPortal
            placeholderText="По дате"
          />
        </div>
      </form>
    </div>
  )
}

export default Filter
