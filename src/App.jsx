import { Routes, Route } from "react-router";
import { HomePage, VideoPage } from "./pages";

function App() {
  return (
    <main className="flex justify-center bg-[var(--bg-color)]  text-white">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/:videoID" element={<VideoPage />} />
        </Routes>  
      </div>
    </main>
  );
}

export default App;
