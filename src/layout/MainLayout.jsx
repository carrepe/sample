import React from 'react'
import MenuList from './MenuList'
import { Outlet } from 'react-router-dom'
import css from './MainLayout.module.css'

const MainLayout = () => {
  return (
    <div className={css.layout}>
      <MenuList />
      <Outlet />
    </div>
  )
}

export default MainLayout
