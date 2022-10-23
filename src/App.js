import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import Artists from "./components/SearchArtists";
import Albums from "./components/Albums"
// import ProtectedRoute from "./protectedRoute.js"

function App() {
  return (
    <div>
       <BrowserRouter>
             <Routes>
                 <Route exact path="/" element={<LogIn />}></Route>
                  <Route exact path="/searchartist" element={<Artists />}></Route>
                  <Route exact path="/artists/:id/albums" element={<Albums />}></Route>
             </Routes>
         </BrowserRouter>
      {/* <LogIn /> */}
    </div>
  );
}

export default App;
