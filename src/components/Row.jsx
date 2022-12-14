import { useEffect, useRef, useState } from "react";
import axios from "../axios";

const base_url = "https://image.tmdb.org/t/p/original/";

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const modalRef = useRef();

  // Daten aus der API holen
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      const genres = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=59e6afdf9bfb3fa86289b17a4d2c6541&language=en-US"
      );
      const genresSeries = await axios.get(
        "https://api.themoviedb.org/3/genre/tv/list?api_key=59e6afdf9bfb3fa86289b17a4d2c6541&language=en-US"
      );
      const allGenres = genres.data.genres.concat(genresSeries.data.genres);

      setMovies(request.data.results);
      setGenres(genres.data.genres);
    }
    fetchData();
  }, [fetchUrl]);

  // Funktion zum Öffnen des PopUp Fensters
  function openModal(movie) {
    setSelectedMovie(movie);
    modalRef.current.showModal();
  }

  // HTMl Elemente werden dynamisch geladen
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <button
            className={"modal-btn"}
            key={movie.id}
            onClick={() => openModal(movie)}
          >
            <img
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          </button>
        ))}
      </div>

      {/* PopUp Fenster */}
      <dialog
        ref={modalRef}
        style={{
          backgroundImage: `url(
           "${base_url}${
            selectedMovie?.backdrop_path
              ? selectedMovie?.backdrop_path
              : selectedMovie?.poster_path
          }"
           )`,
          backgroundPosition: "right",
          backgroundSize: "cover",
        }}
        className="info-box"
      >
        <div className="fade">
          <div className="pop-info">
            <header className="popup-header">
              {/* Daten des PopUp Fensters */}
              {`${
                selectedMovie?.original_title
                  ? selectedMovie?.original_title
                  : selectedMovie?.name
              }
              | ${
                selectedMovie?.release_date
                  ? selectedMovie?.release_date.slice(0, 4)
                  : selectedMovie?.first_air_date.slice(0, 4)
              }
              | ${selectedMovie?.vote_average}
              | ${
                genres?.find(
                  (genre) => genre?.id === selectedMovie?.genre_ids[0]
                )?.name
              }`}
            </header>
            <p>{selectedMovie?.overview}</p>
          </div>
        </div>
        <button className="close-btn" onClick={() => modalRef.current.close()}>
          X
        </button>
      </dialog>
    </div>
  );
}
