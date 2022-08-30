import logo from "./logo.svg";
import "./App.css";
import { useNavigate } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gists from "./pages/Gists";
import Auth from "./pages/Auth";
import Navbar from "./Navbar/Navbar";
import GistPage from "./pages/GistPage";
import UserProfile from "./pages/UserProfile";
import StarredGists from "./pages/StarredGists";
import UserGists from "./pages/UserGists";
import EditGist from "./pages/EditGist";
import GistCodeComponent from "./components/GistCodeComponent";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/">
            <Route index element={<Gists />} />
            <Route path="/gist/:gistId" element={<GistPage />} />
          </Route> */}

          {/* <Route path="/">
            <Route index element={<Gists />} />
            <Route path="/gist/:gistId" element={<GistPage />}>
              <Route index element={<GistCodeComponent />} />
              <Route path="edit/:gistId" element={<EditGist />} />
            </Route>
          </Route> */}

          <Route path="/">
            <Route index element={<Gists />} />
            <Route path="/">
              <Route path="/gist/:gistId" element={<GistPage />}>
                <Route index element={<GistCodeComponent />} />
                <Route path="edit/:gistId" element={<EditGist />} />
              </Route>
            </Route>
          </Route>

          <Route path="/user" element={<UserProfile />}>
            <Route index element={<UserGists />} />
            <Route path="starred" element={<StarredGists />} />
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
