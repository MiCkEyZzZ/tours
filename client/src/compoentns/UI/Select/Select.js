import React from 'react'
import Select from 'react-select'

import './Select.css'

const SelectFilter = (
  {
    display,
    options,
    defaultValue,
    styles,
    cursor,
    marginRight,
    marginTop,
    marginLeft,
    border,
    width,
    borderRadius,
    height,
  }) => {
  return (
    <Select
      cacheOptions
      defaultValue={ defaultValue }
      styles={ styles }
      display={ display }
      width={ width }
      height={ height }
      marginRight={ marginRight }
      marginTop={ marginTop }
      marginLeft={ marginLeft }
      border={ border }
      borderRadius={ borderRadius }
      options={ options }
      cursor={ cursor }
    />
  )
}

export default SelectFilter
