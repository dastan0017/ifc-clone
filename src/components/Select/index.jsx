import PropTypes from 'prop-types'
import './Select.scss'

export const Select = ({ onChange, list, defaultMessage, initValue, ...props }) => {
  const handleSelectChange = event => {
    if (event.target.value != -1) {
      onChange(event.target.value)
    } else {
      onChange(null)
    }
  }
  return (
    <select defaultValue={initValue ? initValue : -1} className="custom_select" onChange={handleSelectChange} {...props}>
      {defaultMessage && <option value={-1}>{defaultMessage}</option>}
      {list?.map(el => (
        <option key={el.id} value={el.id}>
          {el.name}
        </option>
      ))}
    </select>
  )
}
Select.propTypes = {
  onChange: PropTypes.func,
  list: PropTypes.array,
  defaultMessage: PropTypes.string,
  initValue: PropTypes.any,
}
