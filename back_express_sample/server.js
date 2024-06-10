// 환경변수 파일을 사용하기 위한 설정
// npm install dotenv
require("dotenv").config();

// express 셋팅
const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

// 파라미터가 application/json 형태로 들어오면 파싱
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트 주소
  })
);

// 파라미터가 application/x-www-form-urlencoded 형태로 들어오면 파싱해줌
app.use(express.urlencoded({ extended: true }));

// openai api 사용을 위해서는 라이브러리 설치 필요
// npm i openai
// openai api key 필요.
// 발급은 https://platform.openai.com/settings/profile?tab=api-keys 에서 가능
// api 발급시 한번만 보이므로 잘 보관해두어야 함
// api key는 보안을 위해 .env 파일에 저장하고 gitignore에 추가해야 함
// api 활용시 비용이 발생할 수 있으니 주의
// 최소 5달러 이상 결제해야 사용 가능
// 단순 채팅은 gpt-3 사용시 0.0065달러/1,000글자
// 비용 정책 참고 https://openai.com/api/pricing/

const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 여행일정 1회성 응답받는 api
app.post("/guide", async (req, res) => {
  console.log(req.body); // { myPlace: '제주도', myDate: '3박 4일' }
  const { myPlace, myDate } = req.body;

  // 1. 여행일정을 작성하는 prompt
  // 어떤 prompt로 작성하면 적절한 답을 해줄지 미리 테스트 https://platform.openai.com/playground/chat?models=gpt-4o
  let prompt;
  prompt += `${myPlace} 여행을 ${myDate}일 일정으로 다녀오려고 한다.`;
  prompt += `스케줄을 오전, 오후, 저녁으로 구분해서 작성하고`;
  prompt += `<p class="t1">1일차</p>
      <p class="t2">오전</p>
      <p class="list">
        <strong> -방문장소</strong> : 간략한 소개<br />
        <strong>- 방문장소</strong> : 간략한 소개<br />
        <strong>- 방문장소</strong> : 간략한 소개<br />
        <strong>- 방문장소</strong> : 간략한 소개<br />
      </p>
      <p class="t2">오후</p>
      <p class="list">
        <strong> -방문장소</strong> : 간략한 소개<br />
        <strong>- 방문장소</strong> : 간략한 소개<br />
        <strong>- 방문장소</strong> : 간략한 소개<br />
      </p>
      위와 같은 형식으로 일별로 반복해서 작성해주세요.
      `;
  prompt += `
  위 코드를 작성할 때 주의할 점은
  1. 방문장소는 해당 장소의 이름을 적어주세요.
  2. 간략한 소개는 해당 장소의 간단한 소개를 적어주세요.
  3. 방문장속의 간략한 소개는 1-2문장 정도로 작성해주세요.
  4. 간략 소개 끝에는 <br /> 태그를 넣어주세요.
  5. 일정은 1일차부터 순서대로 작성해주세요.
  6. html, body, head 태그는 작성하지 않아도 됩니다.

  `;

  // 2. prompt를 전달하고 결과를 받아옴
  const result = await callChatGPT(prompt);
  if (result) {
    res.json({ response: result });
  } else {
    res.status(500).json({ error: "실패" });
  }
});

async function callChatGPT(prompt) {
  try {
    const result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // gpt 모델 버전
      messages: [
        // 1. GPT 역할 부여 샘플
        {
          role: "system",
          content: "당신은 여행 가이드 입니다. ",
        },
        { role: "user", content: "당신은 여행 가이드 입니다." },
        {
          role: "assistant",
          content:
            "안녕하세요! 저는 여행 가이드입니다. 여행 계획이나 관심 있는 곳이 있다면 언제든지 말씀해주세요. 저는 여러 나라의 문화와 역사, 음식, 관광지 등에 대한 지식이 풍부합니다. 아직 알려지지 않은 숨은 여행지도 알고 있습니다. 여행하려는 지역과 여행기간을 전달받으면 최고의 여행 스케줄을 제안하는 일을 합니다.",
        },

        // 2. 내가 전달한 prompt
        { role: "user", content: prompt },
      ],
      max_tokens: 1000, // 돈 많이 나갈까봐 글자수 제한;
      temperature: 0.7, // 0.0 ~ 1.0 사이의 값. 0.0에 가까울수록 더 안전한 선택을, 1.0에 가까울수록 더 창의적인 선택을 함.
      top_p: 1, // 0.0 ~ 1.0 사이의 값. 1.0에 가까울수록 다양한 선택을 함.
      frequency_penalty: 0.0, // 0.0 ~ 1.0 사이의 값. 0.0에 가까울수록 더 반복적인 선택을 함.
      presence_penalty: 0.0, // 0.0 ~ 1.0 사이의 값. 0.0에 가까울수록 더 새로운 선택을 함.
    });

    console.log("result: ", result.choices[0].message);
    return result.choices[0].message;
  } catch (e) {
    console.log(e);
  }
}

//채팅 api
app.post("/chat", async (req, res) => {
  console.log(req.body);
  const { myChat } = req.body;
  const result = await callChatGPT2(myChat);
  if (result) {
    res.json({ response: result });
  } else {
    res.status(500).json({ error: "실패" });
  }
});

//모든 대화가 저장되는 변수
const chatHistory = [
  {
    role: "system",
    content:
      "당신은 날씨에 따라 오늘의 의상을 추천하는 웨더핏 운영자입니다. 사용자가 날씨에 따라 어떤 의상을 입을지 물어보면 적절한 의상을 추천하고, 착장 샘플 이미지를 제공합니다.",
  },
  {
    role: "user",
    content: "오늘은 어떤 의상을 입는것이 좋을까요? 추천해 주세요.",
  },
  {
    role: "assistant",
    content:
      "좋습니다. 날씨를 이야기해 주시면 오늘 날씨에 맞는 의상 추천과 함께 남여 착장 이미지로 보여드릴께요",
  },
];

async function callChatGPT2(myChat) {
  try {
    const newPrompt = { role: "user", content: myChat };
    chatHistory.push(newPrompt);

    const result = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: chatHistory,
      max_tokens: 2000,
      temperature: 0.7,
      top_p: 1,
      // 옵션 생략 가능
    });

    console.log("result: ", result.choices[0].message);
    return result.choices[0].message;
  } catch (e) {
    console.log(e);
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
