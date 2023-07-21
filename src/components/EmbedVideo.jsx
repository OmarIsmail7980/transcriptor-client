import LazyLoad from "react-lazyload";

// eslint-disable-next-line react/prop-types
const EmbedVideo = ({ video }) => {
  return (
    <LazyLoad height={200} offset={100}>
      <iframe
        className="w-full h-full rounded-xl"
        src={`https://www.youtube-nocookie.com/embed/${video.id.videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </LazyLoad>
  );
};

export default EmbedVideo;
