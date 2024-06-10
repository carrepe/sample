import React, { useState } from "react";

const ChatGPT = () => {
  const [myPlace, setMyPlace] = useState("");
  const [myDate, setMyDate] = useState("");
  const [chatData, setChatData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. myPlace와 myDate 값이 없으면 입력하라는 alert창 띄우기
    if (myPlace === "" || myDate === "") {
      alert("여행지와 일정을 입력해 주세요");
      return;
    }

    // 2. 데이터가 전달받기 전까지 '잠시만 기다려주세요' 문구를 띄우기
    setChatData("지금 일정표를 짜고 있어요. 잠시만 기다려주세요...");

    // 3. 사용자가 입력한 여행지와 일정을 가져와서 백엔드로 전달
    const response = await fetch("http://localhost:8000/guide", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        myPlace: myPlace,
        myDate: myDate,
      }),
    });

    // 4. 백엔드에서 받은 응답을 json으로 변환하여 chatData에 추가
    const data = await response.json();
    console.log(data);

    setChatData(data.response.content);

    // 5.입력창 초기화
    setMyPlace("");
    setMyDate("");
  };

  return (
    <div>
      <h1>openai api 활용 단답 형태의 답변 받기</h1>
      <p style={{ textAlign: "center", paddingBottom: "1rem" }}>
        내용을 입력하면 chat gpt의 답변을 받을 수 있음
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          textAlign: "center",
          padding: "1rem",
          backgroundColor: "lightcoral",
        }}
      >
        <label htmlFor="place">어디로 여행하세요?</label>
        <input
          type="text"
          id="place"
          placeholder="국가명이나 지역명을 입력해 주세요"
          value={myPlace}
          onChange={(e) => setMyPlace(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="date">몇일 일정인가요?</label>
        <input
          type="text"
          id="date"
          placeholder="예) 2박 3일 등으로 일정을 입력해 주세요"
          value={myDate}
          onChange={(e) => setMyDate(e.target.value)}
        />
        <br />
        <button type="submit" id="btnSendMessage">
          일정짜기
        </button>
      </form>
      {/* 답변이 전달되면 내부에 chat 내용 입력*/}
      <div
        style={{
          border: "1px solid lightgray",
          borderRadius: "10px",
          width: "80%",
          margin: "50px auto",
          padding: "20px",
        }}
        dangerouslySetInnerHTML={{ __html: chatData }}
      ></div>
    </div>
  );
};

export default ChatGPT;
