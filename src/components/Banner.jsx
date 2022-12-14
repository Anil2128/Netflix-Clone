import { useEffect, useState } from "react"
import axios from "../axios";
import requests from "../requests";


export default function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(()=>{
    async function fetchData() {
        const request = await axios.get(requests.fetchTrending);
        // zufälliger Film wird für den Banner ausgewählt
        setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length -1)]);
        return request;
    }
    fetchData();
  },[]);
  console.log(movie);

  // Funktion um ein zu langen Text abzukürzen
  function truncate(str,n){
    return str?.length > n ? str.substr(0, n-1) + "...": str;
  }

    return (
    <header className="banner"
    style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
        backgroundPosition: "center center"
    }}

    > {/* Background Image*/}
        <div className="banner_contents">
        {/* title */}
        <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">
          {truncate(movie?.overview, 150)}
          </h1>
        {/* description */}
        </div>
       <div className="banner--fadeBottom"/>
    </header>
  )
}