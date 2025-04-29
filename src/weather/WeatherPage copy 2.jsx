import React from 'react'
import css from './WeatherPage.module.css'
import {
  useAddFavoriteCity,
  useWeather,
  useFavoriteCities,
  useRemoveFavoriteCity,
} from './useWeather'
import { Button } from './Button'
import { useSearchParams } from 'react-router-dom'
import FavoriteCities from './FavoriteCities'

const WeatherPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const city = searchParams.get('city')

  const cityButtons = [
    { id: 'current', label: '현재위치' },
    { id: 'seoul', label: '서울' },
    { id: 'hongkong', label: '홍콩' },
    { id: 'new york', label: '뉴욕' },
    { id: 'paris', label: '파리' },
  ]
  const { data: weatherData, isLoading, isError } = useWeather(city)

  // 즐겨찾기 데이터 가져오기
  const { data: favoriteCities } = useFavoriteCities()
  console.log('즐겨찾기 도시', favoriteCities)

  //  mutation을 활용한 즐겨찾기 기능
  const addFavorite = useAddFavoriteCity()
  const removeFavorite = useRemoveFavoriteCity()
  // 즐겨찾기 추가 버튼 클릭 핸들러
  const handleAddFavorite = () => {
    if (city && city !== 'current') {
      addFavorite.mutate(city)
    } else if (weatherData) {
      addFavorite.mutate(weatherData.name)
    }
  }

  // 즐겨찾기 제거 버튼 클릭 핸들러
  const handleRemoveFavorite = cityToRemove => {
    removeFavorite.mutate(cityToRemove)
  }

  // 현재 표시중인 도시가 즐겨찾기에 있는지 확인
  const isCurrentCityFavorite = () => {
    if (!weatherData) return false
    return favoriteCities.includes(city || weatherData.name)
  }

  const handleChangeCity = city => {
    if (city === 'current') {
      setSearchParams({})
    } else {
      setSearchParams({ city })
    }
  }

  return (
    <main className={css.main}>
      <h2>WeatherPage</h2>
      {isLoading && <p>Loading...</p>}
      {isError && <p>에러 발생</p>}
      {!isLoading && !isError && weatherData && (
        <div className={css.weatherInfo}>
          <p className={css.location}>
            {weatherData.sys.country} / {weatherData.name}
          </p>
          <div className={css.tamperature}>
            <p>{weatherData.main.temp} &#8451;</p>
            <p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt=""
              />
            </p>
            <div>
              {/* 즐겨찾기 추가/제거 버튼 */}
              {isCurrentCityFavorite() ? (
                <button
                  onClick={() => handleRemoveFavorite(city || weatherData.name)}
                  className={css.favoriteButton}
                  disabled={removeFavorite.isPending}
                >
                  {removeFavorite.isPending ? '처리 중...' : '❤️ 즐겨찾기 제거 '}
                </button>
              ) : (
                <button
                  onClick={handleAddFavorite}
                  className={css.favoriteButton}
                  disabled={addFavorite.isPending}
                >
                  {addFavorite.isPending ? '처리 중...' : '🤍 즐겨찾기 추가'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className={css.btnList}>
        {cityButtons.map(button => (
          <Button
            key={button.id}
            city={button.id}
            label={button.label}
            onClick={handleChangeCity}
          />
        ))}
      </div>
      <FavoriteCities
        favoriteCities={favoriteCities}
        handleRemoveFavorite={handleRemoveFavorite}
        handleChangeCity={handleChangeCity}
      />
    </main>
  )
}

export default WeatherPage
