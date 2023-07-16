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
    <section className="flex justify-center mt-5 mb-10">
      <input
        className="search-bar bg-[var(--search-bg)] pl-2 pr-1 py-2 text-[18px]"
        type="search"
        onChange={(e) => setText(e.target.value)}
      />
      <button className="submit-btn px-3 " type="submit" onClick={handleSubmit}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search">
          <path
            fill="#CACAC1"
            d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"
          ></path>
        </svg>
      </button>
    </section>
  );
};

export default SearchBar;
