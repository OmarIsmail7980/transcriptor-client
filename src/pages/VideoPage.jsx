import { useParams, Navigate } from "react-router-dom";
import { useVideo } from "../context/VideoContext";
import { useEffect, useState } from "react";
import { Loading } from "../components";

const VideoPage = () => {
  const { videoArray } = useVideo();
  console.log(videoArray);
  const { videoID } = useParams();
  const [transcript, setTranscript] = useState("");
  const selectedVideo = videoArray.get(videoID);
  const heightSize = transcript ? "h-full" : "h-screen";

  useEffect(() => {
    const getTranscript = async (id) => {
      console.log({ id });
      try {
        const response = await fetch(
          `http://localhost:8091/api/v1/transcribe/${id}`,
          {
            method: "GET",
          }
        ).then((response) => response.json());

        console.log("hello");
        console.log({ response });
        setTranscript(response.transcript);
      } catch (error) {
        alert(error.message);
      }
    };

    getTranscript(videoID);
  }, [videoID]);

  if (videoArray.size === 0) {
    return <Navigate to="/" />;
  }

  return (
    <section className={`${heightSize}`}>
      <div className="bg-[var(--search-bg)] rounded-lg p-2">
        <iframe
          className="w-full h-[300px] rounded-xl mb-4"
          src={`https://www.youtube-nocookie.com/embed/${videoID}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <h1 className="font-medium text-[24px]">
          {selectedVideo.snippet.title}
        </h1>
      </div>
      <div className="bg-[var(--search-bg)] rounded-lg p-2 my-10">
        {transcript ? transcript : <Loading />}
      </div>
    </section>
  );
};

export default VideoPage;
