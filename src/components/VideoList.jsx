import {useState} from "react";
import { useVideo } from "../context/VideoContext";
import SearchBar from "./SearchBar";
import "./VideoList.css";

const VideoList = () => {
  const { videoArray } = useVideo();
  const[transcript, setTranscript]  = useState("");
  console.log(videoArray);
  const dynamicHeight = videoArray.length>0 ? "h-full":"h-screen";

  const handleTranscript = async (id)=>{
    try {
      const response = await fetch(`http://localhost:8091/api/v1/transcribe/${id}`, {
        method: "GET",
      }).then((response) => response.json());
      console.log(response.transcript);
      setTranscript(response.transcript);
    } catch (error) {
      alert(error.message)
    }
    
  }
  return (
    <div className={`${dynamicHeight}`}>
      <SearchBar className="" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videoArray?.length > 0 && (
          <>
            {videoArray.map((video, index) => (
              <div
                key={index + Math.random() * 100}
                className="bg-[var(--search-bg)] rounded-lg p-4 shadow"
              >
                <h2 className="text-lg font-bold mb-2">
                  {video.snippet.title}
                </h2>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${video.id.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => handleTranscript(video.id.videoId)}
                >
                  Get transcript
                </button>
                {transcript && <p>{transcript}</p>}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoList;
