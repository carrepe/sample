import React from 'react'
import css from './WeatherPage.module.css'

const WeatherInfo = ({
  weatherData,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
  cityName,
  isAddPending,
  isRemovePending,
}) => {
  return (
    <div className={css.weatherInfo}>
      <p className={css.location}>
        {weatherData.sys.country} / {weatherData.name}
      </p>
      <div className={css.tamperature}>
        <p>{weatherData.main.temp} &#8451;</p>
        <p>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="" />
        </p>
        <div className={css.infoCon}>
          {isFavorite ? (
            <button
              onClick={() => onRemoveFavorite(cityName)}
              className={css.favoriteButton}
              disabled={isRemovePending}
            >
              {isRemovePending ? '처리 중...' : '❤️ 즐겨찾기 제거 '}
            </button>
          ) : (
            <button onClick={onAddFavorite} className={css.favoriteButton} disabled={isAddPending}>
              {isAddPending ? '처리 중...' : '🤍 즐겨찾기 추가'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default WeatherInfo
