import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'

import "react-datepicker/dist/react-datepicker.css"
import './DatePicker.css'

const DatesPicker = ({ startDate, endDate, onChange, placeholderText, dateFormat, selectsRange }) => {
  registerLocale('ru', ru)

  return (
    <div className="datapicker">
      <DatePicker
        selectsRange={ selectsRange }
        locale="ru"
        dateFormat={ dateFormat }
        startDate={ startDate }
        endDate={ endDate }
        onChange={ onChange }
        placeholderText={ placeholderText }
      />
    </div>
  )
}

export default DatesPicker
