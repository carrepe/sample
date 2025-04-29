import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getCurrentData,
  getCountryData,
  addFavoriteCity,
  removeFavoriteCity,
  getFavoriteCities,
} from './getWeatherApi'

// 날씨 데이터 조회 훅
export const useWeather = city => {
  return useQuery({
    queryKey: ['weather', city],
    queryFn: async () => {
      try {
        return city ? await getCountryData(city) : await getCurrentData()
      } catch (err) {
        console.log('날씨 데이터 조회 실패', err)
        throw err // 에러 전파하여 isError 트리거
      }
    },
    staleTime: 1000 * 3,
    retry: 1,
  })
}

// 즐겨찾기 관련 훅들 통합 관리 함수
const createFavoriteMutation = (mutationFn, errorMsg) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favoriteCity'] }),
    onError: err => console.log(errorMsg, err),
  })
}

// 즐겨찾기 추가 훅
export const useAddFavoriteCity = () =>
  createFavoriteMutation(addFavoriteCity, '즐겨찾기 도시 추가 실패')

// 즐겨찾기 제거 훅
export const useRemoveFavoriteCity = () =>
  createFavoriteMutation(removeFavoriteCity, '즐겨찾기 도시 제거 실패')

// 즐겨찾기 목록 조회 훅
export const useFavoriteCities = () =>
  useQuery({
    queryKey: ['favoriteCity'],
    queryFn: getFavoriteCities,
    staleTime: 1000 * 60 * 5,
  })
