import { useState } from 'react'

export const useInput = initialValue => {
  const [value, setValue] = useState({ initialValue })

  return [
    { value, onChange: evt => setValue({ ...initialValue, [evt.target.name]: evt.target.value }) },
    () => setValue(initialValue)
  ]
}
