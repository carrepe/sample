import { useState } from "react";

const ChatingAi = () => {
  const [myChat, setMyChat] = useState("");
  const [textList, setTextList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (myChat === "") {
      alert("질문을 입력해주세요");
      return;
    }

    // 1. 사용자가 입력한 질문을 백엔드로 전송
    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          myChat: myChat,
        }),
      });

      // 2. 백엔드에서 받은 응답을 json으로 변환 하여 textList에 추가
      console.log("백엔드 요청결과 --- ", response);
      const data = await response.json();
      console.log("json 변경 ---", data);

      const resContent = data.response.content;
      // resContent 내부에 http가 있으면 이미지로 간주
      // <a href="이미지경로">의상추천</a> 으로 변경
      const outputString = resContent.replace(
        /\!\[(.*?)\]\((.*?)\)/g,
        '<img alt="$1" src="$2">'
      );

      setTextList([
        { writer: "웨더핏", content: outputString },
        { writer: "사용자", content: myChat },
        ...textList,
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Chat GPT와 채팅하기</h1>

      <div
        style={{
          border: "1px solid lightgray",
          borderRadius: "10px",
          width: "80%",
          margin: "50px auto",
          padding: "20px",
        }}
      >
        {textList.map((text, i) => {
          return (
            <div key={i}>
              {text.writer === "사용자" ? (
                <>
                  <p style={{ color: "blue", textAlign: "right" }}>
                    {text.writer}
                  </p>
                  <p
                    className="content"
                    style={{ color: "blue", textAlign: "right" }}
                  >
                    {text.content}
                  </p>
                </>
              ) : (
                <>
                  <p style={{ color: "red" }}>{text.writer}</p>
                  <p
                    className="content"
                    dangerouslySetInnerHTML={{ __html: text.content }}
                  ></p>
                </>
              )}
            </div>
          );
        })}

        <div>
          <p className="writer" style={{ color: "red" }}>
            웨어핏
          </p>
          <p className="content">
            오늘의 날씨에 따라 적합한 의상을 추천해드리겠습니다. 오늘의 날씨는
            어떤가요?
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          textAlign: "center",
          padding: "1rem",
          backgroundColor: "lightcoral",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <textarea
          type="text"
          id="place"
          placeholder="웨더핏에게 질문하세요"
          value={myChat}
          onChange={(e) => setMyChat(e.target.value)}
          style={{ width: "70%", height: "50px" }}
        ></textarea>
        <button type="submit" id="btnSendMessage">
          질문하기
        </button>
      </form>
    </div>
  );
};

export default ChatingAi;
