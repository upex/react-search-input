import React from 'react';
import PropTypes from 'prop-types';
import './AutoInput.css';

const AutoInput = ({ inputRef, value, handleOnChange, handleOnKeyDown, handleOnBlur, handleOnFocus, placeholder }) => <input
  type="text"
  onChange={handleOnChange}
  onKeyDown={handleOnKeyDown}
  onBlur={handleOnBlur}
  onFocus={handleOnFocus}
  placeholder={placeholder}
  className="auto-suggest-input"
  value={value}
  ref={inputRef}
  />

AutoInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleOnChange: PropTypes.func,
  handleOnKeyDown: PropTypes.func,
  handleOnBlur: PropTypes.func,
  handleOnFocus: PropTypes.func
}
export default AutoInput;