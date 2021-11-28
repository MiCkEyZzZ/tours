import moment from 'moment'
import { MAX_LENGTH_DESCRIPTION } from '../consts'

export const makeShortTourDescription = (description) => {
  let shortDescription = description

  if (description.length > MAX_LENGTH_DESCRIPTION) {
    shortDescription = description.slice(0, MAX_LENGTH_DESCRIPTION) + `...`
  }

  return shortDescription
}

const formatter = new Intl.NumberFormat('ru-RU', {
  currency: 'RUB',
  style: 'currency'
})

export function currency (value) {
  return formatter.format(value)
}

export function currencyDate (value) {
  return moment(value).format('LL')
}

export function convertWorld (world) {
  let answer

  switch (world) {
    case 'easy':
      answer = 'лёгкий'
      break
    case 'medium':
      answer = 'средний'
      break
    case 'difficult':
      answer = 'сложный'
      break
    default:
      answer = world
  }

  return answer
}

export const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    padding: 2,
  }),

  control: (_, { selectProps: { width, border, height, marginTop, marginLeft, borderRadius, display, marginRight, cursor }}) => ({
    display: display,
    width: width,
    height: height,
    marginRight: marginRight,
    marginTop: marginTop,
    marginLeft: marginLeft,
    border: border,
    borderRadius: borderRadius,
    cursor: cursor
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.8 : 1
    const transition = 'opacity 100ms'

    return { ...provided, opacity, transition }
  }
}

export const links = [
  { to: '/', label: 'header.linkOne', exact: true },
  { to: '/tours', label: 'header.linkTwo', exact: false },
  { to: '/about', label: 'header.linkThree', exact: false }
]

export const languages = [
  { id: 2, title: 'DE', type: 'de', idx: 'de' },
  { id: 3, title: 'EN', type: 'en', idx: 'en' },
  { id: 5, title: 'FR', type: 'fr', idx: 'fr' },
  { id: 9, title: 'RU', type: 'ru', idx: 'ru' }
]

export const sunIcon = (
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.063a5.124 5.124 0 1 1 0-10.248 5.124 5.124 0 0 1 0 10.248Zm11.993-2.829a.533.533 0 0 1-.335.414l-3.807 1.457 1.23 3.715a.533.533 0 0 1-.612.69l-3.992-.826-.966 3.793a.532.532 0 0 1-.888.25l-2.918-2.846-2.858 2.673a.533.533 0 0 1-.882-.268l-.923-3.97-3.849.712a.533.533 0 0 1-.599-.702l1.363-3.842L.332 14.01a.532.532 0 0 1-.126-.914l3.218-2.501-2.258-3.197a.532.532 0 0 1 .386-.837l4.06-.372-.18-3.91a.533.533 0 0 1 .778-.497l3.619 1.875 1.957-3.39a.533.533 0 0 1 .922 0l2.102 3.642 3.622-1.78a.532.532 0 0 1 .766.513l-.271 4.067 3.889.439a.533.533 0 0 1 .369.845l-2.421 3.28 3.039 2.465c.148.12.22.31.19.497ZM12 18.313a6.332 6.332 0 0 0 4.507-1.867 6.332 6.332 0 0 0 1.867-4.507 6.332 6.332 0 0 0-1.867-4.507A6.332 6.332 0 0 0 12 5.566a6.332 6.332 0 0 0-4.507 1.866 6.332 6.332 0 0 0-1.867 4.507c0 1.703.663 3.303 1.867 4.507A6.332 6.332 0 0 0 12 18.313Z" fill="#FBC531"/></svg>
)

export const moonIcon = (
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.013 24C6.389 24 1 18.61 1 11.987A11.983 11.983 0 0 1 12.461.002a.5.5 0 0 1 .492.287.525.525 0 0 1-.063.566 10.98 10.98 0 0 0-2.487 6.954c0 6.048 4.919 10.968 10.968 10.968.102 0 .202-.008.304-.015l.198-.012a.541.541 0 0 1 .491.287.516.516 0 0 1-.064.565A11.975 11.975 0 0 1 13.013 24Z" fill="#487eb0"/></svg>
)
