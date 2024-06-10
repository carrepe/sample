export const SnsLogin = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_APP_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  // 카카오 로그인 인증 코드 요청
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  console.log(link);

  const kakaoLoginHandler = () => {
    console.log("카카오 로그인");
    window.location.href = link;
  };
  const naverLoginHandler = () => {
    console.log("네이버 로그인");
  };

  const googleLoginHandler = () => {
    console.log("구글 로그인");
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h1>SNS 로그인</h1>
      <div style={{ textAlign: "center" }}>
        <button onClick={kakaoLoginHandler}>카카오 로그인</button>
        <button onClick={naverLoginHandler}>네이버 로그인</button>
        <button onClick={googleLoginHandler}>구글 로그인</button>
      </div>
      <hr />
      <div>
        Kakao Developers api
        <ol style={{ listStyle: "outside", listStyleType: "dominantBaseline" }}>
          <li>
            <a href="https://developers.kakao.com/">카카오 개발자 사이트</a>
            에서 로그인
          </li>
          <li>키 발급</li>
          <li>
            내 애플리케이션 → 제품 설정 →{" "}
            <a href="https://developers.kakao.com/console/app/1085947/product/login">
              카카오로그인 메뉴에 접근
            </a>
          </li>
          <li>
            카카오 로그인 활성화 설정 및 Redirect URI 등록 | 배포할 경우 URI
            변경
          </li>
          <li>동의 항목 설정</li>
          <li>backend 개발</li>
          <li>
            Redirect URI로 처리결과 받았을 때 사용자 정보를 바탕으로 로그인 처리
            개발 Auth.jsx 개발
          </li>
        </ol>
      </div>
      <div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://velog.io/@rmdnps10/React-KAKAO-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84"
        >
          블로그 참고
        </a>
      </div>
      <hr />
      <p>
        Naver Developers api
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://developers.naver.com/docs/login/api/api.md#%EB%A1%9C%EA%B7%B8%EC%9D%B8"
        >
          공식문서
        </a>
      </p>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://choijying21.tistory.com/entry/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%84%A4%EC%9D%B4%EB%B2%84-%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0%ED%94%84%EB%A1%A0%ED%8A%B8-%EB%B6%80%EB%B6%84-%EB%84%A4%EC%95%84%EB%A1%9C"
        >
          블로그 참고
        </a>
      </p>
    </div>
  );
};

export default SnsLogin;
