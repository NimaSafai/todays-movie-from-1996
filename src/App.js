import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    getTrendingMovieData("movie");
  }, []);

  const date = new Date();
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0");

  let releaseDate = "1996-" + mm + "-" + dd;

  async function getTrendingMovieData(type) {
    try {
      const apiKey = "337ef805ca4de2974cfe49a48058cc5e";
      let resp = await axios.get(
        `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&page=1&include_adult=false&include_video=false&primary_release_date.gte=${releaseDate}&primary_release_date.lte=${releaseDate}&sort_by=popularity.desc`
      );
      console.log("Data: ", resp.data.results);
      setMovieData(resp.data.results);
    } catch (e) {}
  }

  return (
    <>
      <div className="background_container">
        <div className="flex-container">
          {movieData.map((item) => (
            <div className="movie_item">
              <div className="container">
                <img
                  alt=""
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w300/${item.poster_path}`
                      : `https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg`
                  }
                />
                <div className="overlay">
                  <div className="text">{item.overview}</div>
                </div>
              </div>
              <div className="movie_name">
                {item.original_title ? item.original_title : item.original_name}
              </div>
              <div className="release_date">{item.release_date}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
