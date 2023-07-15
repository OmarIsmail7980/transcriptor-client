import { createContext, useContext, useState } from "react";

const videoContext = createContext([]);

export const VideoContextProvider = ({ children }) => {
  const [videoArray, setVideoArray] = useState([]);

  return (
    <videoContext.Provider value={{ videoArray, setVideoArray }}>
      {children}
    </videoContext.Provider>
  );
};

export const useVideo = () => {
  return useContext(videoContext);
};
