import { useEffect } from "react";
import { useVideo } from "../context/VideoContext";
import SearchBar from "./SearchBar";
import "./VideoList.css";
import { NavLink } from "react-router-dom";

const VideoList = () => {
  const { videoArray, setVideoArray } = useVideo();
  console.log(videoArray);
  const list = [...videoArray.values()];
  console.log(list);
  const dynamicHeight = list.length > 0 ? "h-full" : "h-screen";

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await fetch(
          "http://localhost:8091/api/v1/transcribe",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: "NASA" }),
          }
        ).then((response) => response.json());
        const videoMap = new Map();
        for (let video of response.videos) {
          videoMap.set(video.id.videoId, video);
        }
        setVideoArray(videoMap);
      } catch (error) {
        alert(error);
      }
    };
    getVideos();
  }, []);

  return (
    <div className={`${dynamicHeight}`}>
      <SearchBar className="" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list?.length > 0 && (
          <>
            {list.map((video, index) => (
              <NavLink
                key={index + Math.random() * 100}
                to={`/${video.id.videoId}`}
              >
                <div className="px-2 h-[240px] rounded-xl bg-[rgba(255,255,255,0.3)]">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <iframe
                      className="w-full h-full rounded-xl"
                      src={`https://www.youtube-nocookie.com/embed/${video.id.videoId}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <h1 className="font-medium text-[16px]">
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
