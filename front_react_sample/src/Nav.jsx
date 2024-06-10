import { useEffect, useState } from "react";
import style from "./Nav.module.css";

import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ properties: {} });
  const [token, setToken] = useState(localStorage.getItem("token")); // token 상태를 추가합니다.
  const { nickname = "", profile_image = "" } = userInfo.properties || {}; // 사용자 정보를 가져옵니다.
  console.log(userInfo);

  const getUserData = async (token) => {
    // 2. Token을 이용하여 카카오 서버에서 인증을 거처 사용자 정보를 가져옴
    const response = await fetch(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    const user = await response.json();
    // 3. 사용자 정보를 state에 저장
    setUserInfo(user, () => navigate("/"));
  };

  useEffect(() => {
    const fetchData = async () => {
      // 1_1.  localStorage에 저장된 token이 있다면 사용자 정보를 가져옴
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await getUserData(token);
        } catch (err) {
          // 1_2.  localStorage에 저장된 token이 만료되었다면 token을 삭제하고 null로 업데이트
          console.log(err);
          localStorage.removeItem("token");
          setToken(null); // token 상태를 업데이트합니다.
        }
      }
    };
    fetchData();
  }, [localStorage.getItem("token")]); // token이 변경될 때마다 실행

  const kakaoLogOut = () => {
    localStorage.removeItem("token"); // token을 삭제합니다.
    setUserInfo({ properties: {} }); // 사용자 정보를 초기화합니다.
    navigate("/"); // 메인 페이지로 이동합니다.
  };

  return (
    <nav>
      {userInfo && Object.keys(userInfo.properties || {}).length === 0 ? (
        "로그인이 필요합니다."
      ) : (
        <div>
          카카오 사용자 이름 {nickname} /{" "}
          <img
            src={profile_image}
            alt=""
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />{" "}
          <button onClick={kakaoLogOut}>로그아웃</button>
        </div>
      )}
      <hr />
      <ul className={style.gnb}>
        <li>
          <Link to="/Location">카카오지도</Link>
        </li>
        <li>
          <Link to="/Location2">현제위치정보</Link>
        </li>
        <li>
          <Link to="/loginKakao">SNS 로그인</Link>
        </li>
        <li>
          <Link to="/chatGPT">OpenAi</Link>
        </li>
        <li>
          <Link to="/ChatingAi">Chating GPT</Link>
        </li>
        <li>
          <Link to="/ChatBot">ChatBot</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
