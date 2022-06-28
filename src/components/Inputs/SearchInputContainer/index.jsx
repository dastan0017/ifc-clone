import React from 'react'
import PropTypes from 'prop-types'
import { SearchIcon } from 'icons'
import '../CustomInputs.scss'

export const SearchInputContainer = ({ children, classes }) => {
  return (
    <div className={`search_bar ${classes}`}>
      <SearchIcon className="search_icon" />
      {children}
    </div>
  )
}
SearchInputContainer.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.string,
}

export default SearchInputContainer
