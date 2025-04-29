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
import WeatherInfo from './WeatherInfo'

// 상수는 컴포넌트 외부에 유지
const CITY_BUTTONS = [
  { id: 'current', label: '현재위치' },
  { id: 'seoul', label: '서울' },
  { id: 'hongkong', label: '홍콩' },
  { id: 'new york', label: '뉴욕' },
  { id: 'paris', label: '파리' },
]

const WeatherPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const city = searchParams.get('city')

  // React Query 훅 사용
  const { data: weatherData, isLoading, isError } = useWeather(city)
  const { data: favoriteCities = [] } = useFavoriteCities()
  const addFavorite = useAddFavoriteCity()
  const removeFavorite = useRemoveFavoriteCity()

  // 현재 도시 이름 결정
  const currentCityName = city && city !== 'current' ? city : weatherData?.name

  // 현재 도시가 즐겨찾기인지 확인
  const isFavorite = currentCityName && favoriteCities.includes(currentCityName)

  // 모든 이벤트 핸들러를 화살표 함수로 통일
  const handleChangeCity = cityId => {
    if (cityId === 'current') {
      setSearchParams({})
    } else {
      setSearchParams({ city: cityId })
    }
  }

  const handleAddFavorite = () => {
    if (currentCityName) {
      addFavorite.mutate(currentCityName)
    }
  }

  const handleRemoveFavorite = cityToRemove => {
    removeFavorite.mutate(cityToRemove)
  }

  // 로딩 및 에러 상태 처리
  if (isLoading)
    return (
      <main className={css.main}>
        <h2>WeatherPage</h2>
        <p>Loading...</p>
      </main>
    )

  if (isError)
    return (
      <main className={css.main}>
        <h2>WeatherPage</h2>
        <p>에러 발생</p>
      </main>
    )

  if (!weatherData)
    return (
      <main className={css.main}>
        <h2>WeatherPage</h2>
        <p>날씨 데이터를 불러올 수 없습니다.</p>
      </main>
    )

  return (
    <main className={css.main}>
      <h2>WeatherPage</h2>

      <WeatherInfo
        weatherData={weatherData}
        isFavorite={isFavorite}
        onAddFavorite={handleAddFavorite}
        onRemoveFavorite={handleRemoveFavorite}
        cityName={currentCityName}
        isAddPending={addFavorite.isPending}
        isRemovePending={removeFavorite.isPending}
      />

      <div className={css.btnList}>
        {CITY_BUTTONS.map(button => (
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
