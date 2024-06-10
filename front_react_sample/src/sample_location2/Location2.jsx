/* global kakao */

import React, { useEffect, useState } from "react";
//HTML5 Geolocation API를 사용
const Location2 = () => {
  const [location, setLocation] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      // navigator.geolocation이 지원되는지 확인
      // 지원이 안되는 경우는? 브라우저가 Geolocation API를 지원하지 않는 경우
      // Geolocation API를 지원하지 않는 브라우저는 대부분이 안드로이드 브라우저
      // 안드로이드 브라우저 종류는? 삼성 인터넷, LG 인터넷, 네이버 웨일, 삼성 웨일, 삼성 브라우저

      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("이 브라우저는 .geolocation 을 사용할 수 없습니다.");
    }
  }, []);

  useEffect(() => {
    if (location) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`;
      document.head.appendChild(script);

      script.onload = () => {
        kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new kakao.maps.LatLng(
              location.latitude,
              location.longitude
            ),
            level: 3,
          };

          const map = new kakao.maps.Map(container, options);
          const markerPosition = new kakao.maps.LatLng(
            location.latitude,
            location.longitude
          );
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(map);
        });
      };
    }
  }, [location]);
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h1>현재 위치 가져오기</h1>
      {location.latitude && (
        <p style={{ textAlign: "center" }}>위도: {location.latitude}</p>
      )}
      {location.longitude && (
        <p style={{ textAlign: "center" }}>경도: {location.longitude}</p>
      )}
      <hr />
      <h1>
        <strong> 현제 위치를 카카오 지도에 반영</strong>
        <span>... 좀 정확하지 않네</span>
      </h1>
      <div id="map" style={{ height: "400px" }}></div>
    </div>
  );
};

export default Location2;
