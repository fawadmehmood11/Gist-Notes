import logo from "./logo.svg";
import "./App.css";
import { useNavigate } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gists from "./pages/Gists";
import Auth from "./pages/Auth";
import Navbar from "./Navbar/Navbar";
import GistPage from "./pages/GistPage";

function App() {
  // const handleLogin = () => {
  //   window.location.href = `${process.env.REACt_APP_BASEURL}${process.env.REACT_APP_CLIENT_ID}`;
  // };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<Gists />} />
            <Route path="/gist/:gistId" element={<GistPage />} />
          </Route>
          {/* <Route path="/" element={<Gists />}>
            <Route path="/gist/:gistId" element={<GistPage />} />
          </Route> */}
          <Route path="/oauth-callback" element={<Auth />} />
        </Routes>
      </BrowserRouter>

      {/* // <main className="App">
    //   <button className="btn btnLogin" onClick={handleLogin}>
    //     Login with Github
    //   </button>
    // </main> */}
    </>
  );
}

export default App;
