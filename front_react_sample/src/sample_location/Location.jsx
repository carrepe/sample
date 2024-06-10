/* global kakao */
import React, { useEffect, useRef, useState } from "react";

const Location = () => {
  const mapRef = useRef(null);
  //useRef 사용이유
  //: DOM에 접근하기 위해 사용하는 객체로, useRef로 생성한 객체 안의 current 프로퍼티에 실제 DOM이나 컴포넌트의 인스턴스를 담고 있는데, 이를 이용해 DOM에 접근할 수 있다.
  //: useRef로 생성한 객체는 컴포넌트가 리렌더링되어도 초기화되지 않고 계속 유지된다.

  // 지도에 표기할 장소들의 정보는 db에서 받아올 수 있음
  // 이 경우 useEffect를 사용하여 db에서 받아온 데이터를 setPositions로 저장하면 됨
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true; // 비동기 방식으로 로드할지 선택
    // 환경변파일(.env) 파일에 저장한 API 키 혹은 서버로부터 받아온 API 키를 사용
    // REACT_APP_KAKAO_APP_KEY=발급받은 API 키 형식으로 저장
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const mapContainer = mapRef.current;
        const mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        const map = new kakao.maps.Map(mapContainer, mapOption);

        // 마커 이미지를 변경해주세요
        const imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        // 장소들의 정보를 받아와서 마킹
        setPositions([
          {
            title: "카카오",
            latlng: new kakao.maps.LatLng(33.450705, 126.570677),
          },
          {
            title: "생태연못",
            latlng: new kakao.maps.LatLng(33.450936, 126.569477),
          },
          {
            title: "텃밭",
            latlng: new kakao.maps.LatLng(33.450879, 126.56994),
          },
          {
            title: "근린공원",
            latlng: new kakao.maps.LatLng(33.451393, 126.570738),
          },
        ]);

        for (let i = 0; i < positions.length; i++) {
          const imageSize = new kakao.maps.Size(24, 35);
          const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
          new kakao.maps.Marker({
            map: map,
            position: positions[i].latlng,
            title: positions[i].title,
            image: markerImage,
          });
        }
      });
    };
  }, [positions]);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h1>
        <strong>카카오지도</strong>
        <br />
        <span>여러개의 장소를 마킹</span>
      </h1>

      <div ref={mapRef} style={{ height: "500px" }}></div>

      <ol style={{ listStyle: "outside", listStyleType: "dominantBaseline" }}>
        <li>
          <a href="https://developers.kakao.com/">카카오 개발자 사이트</a>에서
          로그인
        </li>
        <li>[내애플리케이션] 메뉴에서 애플리케이션 추가하기 </li>
        <li>애플리케이션 이름을 입력하고, 플랫폼에 웹을 추가</li>
        <li>
          내 애플리케이션 → 앱 설정 → 앱키 에서 JavaScript 키를 발급받아 .env
          파일에 저장
        </li>
        <li>
          <a href="https://apis.map.kakao.com/web/">kakaomap api</a> 에서
          sample을 참고하여 개발
        </li>
        <li>
          chat gpt를 활용하여 react 형식으로 변경해서 사용해도 되나 코드 파악 후
          사용하자
        </li>
      </ol>
    </div>
  );
};

export default Location;
