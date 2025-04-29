import React from 'react'
import css from './WeatherPage.module.css'
import { useWeather } from './useWeather'
import { Button } from './Button'
import { useSearchParams } from 'react-router-dom'

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

  const handleChangeCity = city => {
    if (city === 'current') {
      setSearchParams({})
    } else {
      setSearchParams({ city })
    }
  }

  isLoading && <p>Loading...</p>
  isError && <p>에러 발생</p>

  return (
    <main className={css.main}>
      <h2>WeatherPage</h2>
      <div className={css.weatherInfo}>
        <p className={css.location}>
          {weatherData?.sys.country} / {weatherData?.name}
        </p>
        <div className={css.tamperature}>
          <p>{weatherData?.main.temp} &#8451;</p>
          <p>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}.png`}
              alt=""
            />
          </p>
          <div>
            <button>즐겨찾기</button>
          </div>
        </div>
      </div>
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
    </main>
  )
}

export default WeatherPage
