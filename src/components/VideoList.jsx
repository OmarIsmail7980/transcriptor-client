import {useState} from "react";
import { useVideo } from "../context/VideoContext";
import SearchBar from "./SearchBar";
import "./VideoList.css";

const VideoList = () => {
  const { videoArray } = useVideo();
  const[transcript, setTranscript]  = useState("");
  console.log(videoArray);

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
    <div className="videos">
      <SearchBar className="videos" />
      <div className="videos">
        {videoArray?.length > 0 && (
          <>
            {videoArray.map((video, index) => (
              <div key={index + Math.random() * 100}>
                <h2>{video.snippet.title}</h2>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube-nocookie.com/embed/${video.id.videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button onClick={() => handleTranscript(video.id.videoId)}>
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
