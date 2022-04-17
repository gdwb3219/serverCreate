// client/src/App.js

import "./App.css";

// 리액트 라우터 돔에서 필요한 기능들을 불러오기.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 컴포넌트들을 불러오기.
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    // 전체 컴포넌트를 Router 태그 안에 넣어주고 Route들을 Switch 태그로 감싸준다.
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
