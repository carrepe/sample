import { Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import LandingPage from "./LandingPage";
import Location from "./sample_location/Location";
import Location2 from "./sample_location2/Location2";
import SnsLogin from "./sample_sns/SnsLogin";
import Auth from "./sample_sns/Auth";
import ChatGPT from "./sample_chat/ChatGPT";
import ChatingAi from "./sample_chat/ChatingAi";
import ChatBot from "./sample_chat/ChatBot";

function App() {
  return (
    <div className="App">
      <Nav />
      <hr />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Location" element={<Location />} />
        <Route path="/Location2" element={<Location2 />} />
        <Route path="/loginKakao" element={<SnsLogin />} />
        <Route path="/oauth/kakao" element={<Auth />} />
        <Route path="/chatGPT" element={<ChatGPT />} />
        <Route path="/ChatingAi" element={<ChatingAi />} />
        <Route path="/ChatBot" element={<ChatBot />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
