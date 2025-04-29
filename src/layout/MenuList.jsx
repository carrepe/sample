import React from 'react'
import { NavLink } from 'react-router-dom'
import css from './MenuList.module.css'

const MenuList = () => {
  return (
    <ul>
      <CustomNavLink to={'/'} label={'날씨API 활용'} />
      <CustomNavLink to={'/camping'} label={'캠핑장API 활용'} />
    </ul>
  )
}

const CustomNavLink = ({ to, label }) => (
  <li>
    <NavLink to={to} className={({ isActive }) => (isActive ? `${css.active}` : '')}>
      {label}
    </NavLink>
  </li>
)

export default MenuList
