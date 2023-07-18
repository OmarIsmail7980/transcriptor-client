import { useState } from "react";
import { useVideo } from "../context/VideoContext";
import Loading from "./Loading";

const SearchBar = () => {
  const [text, setText] = useState("");
  const { setVideoArray } = useVideo();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8091/api/v1/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: text }),
      }).then((response) => response.json());
      const videoMap = new Map();
      for (let video of response.videos) {
        videoMap.set(video.id.videoId, video);
      }
      setVideoArray(videoMap);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex justify-center mt-5 mb-10">
      <input
        className="search-bar w-full bg-[var(--search-bg)] pl-2 pr-1 py-2 text-[18px]"
        type="search"
        onChange={(e) => setText(e.target.value)}
      />
      <button className="submit-btn px-3 " type="submit" onClick={handleSubmit}>
        {isLoading ? <Loading /> : <>Search</>}
      </button>
    </section>
  );
};

export default SearchBar;
