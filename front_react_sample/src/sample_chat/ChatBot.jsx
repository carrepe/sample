const ChatBot = () => {
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h1>ChatBot</h1>
      <p>챗봇은 유료 회원만 생성이 가능합니다</p>

      <ol style={{ listStyle: "outside", listStyleType: "dominantBaseline" }}>
        <li>
          <a href="https://chatgpt.com/">chatGPT</a> 로그인 합니다.
        </li>
        <li>
          왼쪽 nav 영역에서 <a href="https://chatgpt.com/gpts">GPT탐색</a>을
          클릭합니다. <br />
          ChatGPT 사용자들이 만든 챗봇을 검색하고 사용할 수 있습니다.
        </li>
        <li>
          우측 상단의 만들기 버튼을 클릭하여 chatbot을 생성할 수 있습니다.
        </li>

        <li>
          대화형태로 간단하게 챗봇을 만들 수 있습니다.
          <br /> 사용될 아이콘을 생성하고 사전 설정을 해두어야 합니다.
          <br />
          상단 구성 텝에서 챗봇의 이름, 설명, 아이콘을 설정할 수 있습니다.
          <br /> 왼쪽 미리보기에서 챗봇의 모습을 확인할 수 있습니다.
        </li>
        <li>
          우측 상단의 공유하기로 배포할 수 있으나 유료사용자들끼리만 공유 가능
        </li>
      </ol>
      <hr />
      <ol style={{ listStyle: "outside", listStyleType: "dominantBaseline" }}>
        <li>
          내 홈페이지에 챗봇 적용하기기 위해서는
          <a href="https://platform.openai.com/playground/assistants">
            playground
          </a>
          메뉴를 활용합니다.
        </li>
        <li>asst_ 시작하는 코드와 openai api key가 있어야 합니다.</li>
        <li>playground에 챗봇의 사전설정을 적용합니다</li>
        <li>
          <a href="https://botpress.com/">https://botpress.com/</a>에
          가입합니다.
        </li>
        <li>
          <a href="https://botpress.com/templates/deploy-openai-assistants">
            Botpress 템플릿을 다운받아둡니다.
          </a>
        </li>
        <li>
          new bot 버튼을 클릭하여 생성하고
          <br />
          다운받았던 botpress 템플릿을 업로드 한 후 위에 준비했던 두가지 키를
          적용합니다.
        </li>
        <li>workspaces → Integrations 메뉴에서 설정을 변경할 수 있습니다.</li>
        <li>Shareable URL 를 통해서 챗봇 상태를 미리 확인할 수 있습니다.</li>
        <li>Pre-configured 텝메뉴에서 Embedded code를 react에 적용합니다.</li>
      </ol>
    </div>
  );
};

export default ChatBot;
