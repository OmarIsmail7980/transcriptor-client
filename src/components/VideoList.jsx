import { useEffect } from "react";
import { useVideo } from "../context/VideoContext";
import SearchBar from "./SearchBar";
import "./VideoList.css";
import { NavLink } from "react-router-dom";
import EmbedVideo from "./EmbedVideo";

const VideoList = () => {
  const { videoArray, setVideoArray } = useVideo();
  const list = [...videoArray.values()];
  const dynamicHeight = list.length > 0 ? "h-full" : "h-screen";

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await fetch(
          "https://transcriptor-server.onrender.com/api/v1/transcribe",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: "blackholes" }),
          }
        ).then((response) => response.json());
        const videoMap = new Map();
        for (let video of response.videos) {
          videoMap.set(video.id.videoId, video);
        }
        setVideoArray(videoMap);
      } catch (error) {
        if(error == "TypeError: response.videos is not iterable"){
          alert("exceeded call limit!");
        }else{
          alert(error);
        }
        
      }
    };
    getVideos();
  }, []);

  return (
    <div className={`${dynamicHeight}`}>
      <SearchBar className="" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {list?.length > 0 && (
          <>
            {list.map((video, index) => (
              <NavLink
                key={index + Math.random() * 100}
                to={`/${video.id.videoId}`}
              >
                <div className="px-2 h-[300px] rounded-xl bg-[rgba(255,255,255,0.3)] 
                hover:scale-105 duration-150">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <div className="w-full h-[200px]">
                      <img
                        className="w-full h-full object-contain rounded"
                        src={video.snippet.thumbnails.high.url}
                        alt="thumbnail"
                      />
                    </div>

                    <h1 className="mt-5 font-medium text-[16px]">
                      {video.snippet.title}
                    </h1>
                  </div>
                </div>
              </NavLink>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoList;
