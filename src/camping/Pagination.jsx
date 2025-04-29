import React, { useRef, useState, useEffect } from 'react'
import css from './Pagination.module.css'

const Pagination = ({ currentPage, totalPages, onPageChage }) => {
  // 화면 크기에 따라 그룹 사이즈 관리
  const [isMobile, setIsMobile] = useState(false)
  const [groupSize, setGroupSize] = useState(10)

  // 타이머 ID를 저장할 ref 생성
  const timerRef = useRef(null)

  // 화면 크기 변경 감지 설정
  useEffect(() => {
    // 화면 크기 확인 및 상태 업데이트 함수
    const updateScreenSize = (checkMobile = true) => {
      const mobile = checkMobile ? window.innerWidth <= 1000 : isMobile
      setIsMobile(mobile)
      setGroupSize(mobile ? 3 : 10)
    }

    // 쓰로틀링이 적용된 화면 크기 변경 감지 함수
    const checkScreenSize = () => {
      // 이미 대기 중인 타이머가 있다면 무시
      if (timerRef.current) return

      // 타이머 설정 (200ms 쓰로틀링)
      timerRef.current = setTimeout(() => {
        updateScreenSize()
        // 타이머 참조 초기화
        timerRef.current = null
      }, 200)
    }

    // 초기 화면 크기 확인 (쓰로틀링 없이 즉시 실행)
    updateScreenSize()

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', checkScreenSize)

    // 컴포넌트 언마운트 시 정리
    return () => {
      window.removeEventListener('resize', checkScreenSize)
      // 대기 중인 타이머가 있다면 제거
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [isMobile, groupSize])

  // 보여줄 페이지 범위 계산
  const getPageRAnge = () => {
    const currentGroup = Math.ceil(currentPage / groupSize) // 현재 페이지가 속한 그룹
    const startPage = (currentGroup - 1) * groupSize + 1 // 시작 페이지
    const endPage = Math.min(startPage + groupSize - 1, totalPages) // 끝 페이지

    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return { startPage, endPage, pages }
  }
  const { startPage, endPage, pages } = getPageRAnge()

  // 버튼 상태 계산
  const isPrevGroupDisabled = startPage <= 1
  const isNextGroupDisabled = endPage >= totalPages
  const isPrevPageDisabled = currentPage <= 1
  const isNextPageDisabled = currentPage >= totalPages

  return (
    <div className={css.pagination}>
      <button
        className={`${isPrevGroupDisabled ? css.disabled : ''}`}
        onClick={() => !isPrevGroupDisabled && onPageChage(Math.max(startPage - 10, 1))}
        disabled={isPrevGroupDisabled}
      >
        &laquo;
      </button>
      <button
        className={`${isPrevPageDisabled ? css.disabled : ''}`}
        onClick={() => !isPrevPageDisabled && onPageChage(currentPage - 1)}
      >
        &lt;
      </button>

      <div className={css.pageNumbers}>
        {pages.map(page => (
          <button
            key={page}
            className={`${css.pagePageber} ${currentPage === page ? css.active : ''}`}
            onClick={() => onPageChage(page)}
            disabled={isPrevPageDisabled}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className={`${isNextPageDisabled ? css.disabled : ''}`}
        onClick={() => !isNextPageDisabled && onPageChage(currentPage + 1)}
      >
        &gt;
      </button>
      <button
        className={`${isNextGroupDisabled ? css.disabled : ''}`}
        onClick={() => !isNextGroupDisabled && onPageChage(Math.min(endPage + 1, totalPages))}
        disabled={isNextGroupDisabled}
      >
        &raquo;
      </button>
    </div>
  )
}

export default Pagination
