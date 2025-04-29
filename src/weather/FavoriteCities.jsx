import React from 'react'
import css from './FavoriteCities.module.css'

const FavoriteCities = ({ favoriteCities, handleRemoveFavorite, handleChangeCity }) => {
  if (favoriteCities?.length === 0) {
    return null
  }
  return (
    <div>
      <h3>즐겨찾기 리스트</h3>
      <div className={css.list}>
        {favoriteCities?.map(city => (
          <p key={city}>
            <button onClick={() => handleChangeCity(city)}>{city}</button>
            <button onClick={() => handleRemoveFavorite(city)}>X</button>
          </p>
        ))}
      </div>
    </div>
  )
}

export default FavoriteCities
