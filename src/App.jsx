import { Routes, Route } from "react-router";
import { HomePage, VideoPage } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <main className="flex flex-col justify-center bg-[var(--bg-color)]  text-white">
      <header className="mb-10">
        <Navbar />
      </header>

      <div className="flex justify-center mx-5 md:mx-10 lg:mx-20 mb-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:videoID" element={<VideoPage />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
