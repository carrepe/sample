import React, { useState } from 'react'
import css from './CampingPage.module.css'
import { useCamping } from './useCamping'
import DetailModal from './DetailModal'
import Pagination from './Pagination'

const CampingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(10)

  const { data, isError, isLoading } = useCamping(currentPage, perPage)
  const campingData = data?.data
  const totalCount = data?.totalCount
  const page = data?.page
  // const perPage = data?.perPage

  console.log('캠핑 데이터:', data)
  console.log('totalCount :', totalCount)
  const handleCampingClick = list => {
    setIsModalOpen(true)
    setSelected(list)
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelected(null)
  }

  const calculateTotalPages = () => {
    if (!campingData) return 0
    return Math.ceil(totalCount / perPage)
  }
  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }

  isError && <p>에러 발생</p>
  isLoading && <p>Loading...</p>
  return (
    <main>
      <h2>CampingPage</h2>
      <div>
        <p>
          총 {totalCount}개 중 {perPage}개 표시 / 현재 {page}page
        </p>
        <ul className={css.list}>
          {campingData?.map((list, i) => (
            <li key={list['야영장명'] + i} onClick={() => handleCampingClick(list)}>
              <p>야영장명 : {list['야영장명']}</p>
              <p>주소 : {list['주소']}</p>
              <p>
                연락처 : {list['연락처 앞자리']}-{list['연락처 중간자리']}-{list['연락처 끝자리']}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={calculateTotalPages()}
        onPageChage={handlePageChange}
      />
      {isModalOpen && <DetailModal selected={selected} onClick={handleModalClose} />}
    </main>
  )
}

export default CampingPage
