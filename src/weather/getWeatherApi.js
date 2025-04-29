import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

// 좌표로 날씨정보 가져오기
export const getWeatherByCrrentLocation = async (lat, lon) => {
  try {
    const res = await axios.get(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`
    )
    return res.data
  } catch (err) {
    console.log('좌표로 날씨정보 가져오기 실패', err)
  }
}

// 현재 위치 날씨 정보 가져오기
//getWeatherByCrrentLocation(위도, 경도)
export const getCurrentData = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const { latitude, longitude } = position.coords
          const res = await getWeatherByCrrentLocation(latitude, longitude)
          resolve(res)
        } catch (err) {
          console.log('좌표로 날씨정보 가져오기 실패', err)
          reject(err)
        }
      },
      err => {
        console.log('좌표 가져오기 실패', err)
        reject(err)
      }
    )
  })
}

// 도시명으로 날씨정보 가져오기
export const getCountryData = async city => {
  try {
    const res = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&lang=kr&units=metric`)
    return res.data
  } catch (err) {
    console.log('좌표로 날씨정보 가져오기 실패', err)
  }
}

// mutation 예시
// 즐겨찾기 도시 추가
export const addFavoriteCity = async city => {
  // 실제로는 서버 API를 호출해야 하지만, localStorage에 저장하는 예시입니다.
  try {
    const favoriteCities = JSON.parse(localStorage.getItem('favoriteCities')) || []
    if (!favoriteCities.includes(city)) {
      favoriteCities.push(city)
    }
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities))
  } catch (err) {
    console.log('즐겨찾기 도시 추가 실패', err)
  }
}

// 즐겨찾기 도시 제거
export const removeFavoriteCity = async city => {
  try {
    const favoriteCities = JSON.parse(localStorage.getItem('favoriteCities') || '[]')
    const updatedCities = favoriteCities.filter(favCity => favCity !== city)
    localStorage.setItem('favoriteCities', JSON.stringify(updatedCities))
  } catch (err) {
    console.log(err)
  }
}

// 즐겨찾기 도시 목록 가져오기
export const getFavoriteCities = () => {
  try {
    return JSON.parse(localStorage.getItem('favoriteCities') || '[]')
  } catch (err) {
    console.log(err)
  }
}
