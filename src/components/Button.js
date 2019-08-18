import React from 'react'
import './style.css'

const Button = ({ children, onClick, ...rest }) => (
  <button className="Button" onClick={onClick} {...rest}>
    {children}
  </button>
)

export default Button
