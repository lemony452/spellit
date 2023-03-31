import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WebSocketProvider } from "./store/websocket";
import { useSelector } from "react-redux";
import { RootState } from "./store";

import Home from "./components/Home";
import Game from "./components/Game";
import Matching from "./components/Matching";
import User from "./components/User";
import Ready from "@/components/Game/Ready";
import Defence from "@/components/Game/Defense";
import Attack from "@/components/Game/Attack";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import OAuth from "./components/Auth/OAuth";
import Settle from "./components/Settle/Settle";
import Result from "./components/Game/Result";
// import Test from "./components/Test";
// import OpenViduTest from "./components/Game/OpenVidu/OpenVidu";
// import Spell from "./components/Game/Attack/Spell";
import Profile from "./components/Profile";
// import STT from "./components/Test/STT";
import Deck from './components/User'
// 임시
import Skills from "./components/Settle/Skills";
import Test from "./components/Test";
function App() {
  const isLogged = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <WebSocketProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<Login />}/> */}
          {isLogged ? (
            <Route index element={<Home />} />
          ) : (
            <Route index element={<Login />} />
          )}
          <Route path="home" element={<Home />} />
          <Route path="game/:roomId" element={<Game />} />
          <Route path="matching" element={<Matching />} />
          <Route path="deck" element={<Deck />} />
          <Route path="ready" element={<Ready />} />
          <Route path="defense" element={<Defence />} />
          <Route path="attack" element={<Attack />} />
          <Route path="login" element={<Login />} />
          <Route path="oath" element={<OAuth />} />
          <Route path="join" element={<Signup />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="test" element={<Test/>}/>
          <Route path="settle" element={<Settle />} />
          <Route path="result" element={<Result />} />
          {/* <Route path="spell" element={<Spell />} /> */}
          <Route path="skills" element={<Skills />} />
          <Route path="profile/:id" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  );
}

export default App;
