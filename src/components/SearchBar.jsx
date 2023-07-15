import { useState } from "react";
import { useVideo } from "../context/VideoContext";

const SearchBar = () => {
  const [text, setText] = useState("");
  const {setVideoArray} = useVideo();

  const handleSubmit = async () => {
    try{
        const response = await fetch(
          "http://localhost:8091/api/v1/transcribe",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({query:text})
          }
        ).then((response)=>response.json());
        
        setVideoArray(response.videos);
    }catch(error){
        alert(error);
    }
  };
  
  return (
    <div>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default SearchBar;
