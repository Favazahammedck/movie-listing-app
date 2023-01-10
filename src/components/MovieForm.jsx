import React, { useState, useEffect } from "react";
import { MovieList } from "./MovieList";
// getting the values of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem("movies");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const MovieForm = ({ search }) => {
  // state for saving movies objesct
  const [movies, setMovies] = useState(getDatafromLS());
  // input field states
  const [name, setName] = useState("");
  const [ratings, setRatings] = useState("");
  const [duration, setDuration] = useState("");
  // state for error validation
  const [error, setError] = useState(false);
  // state for notfound or movies visible true
  const [visible, setVisible] = useState(true);
  // state for converting hour to minutes
  const [hour, setHour] = useState([]);
  const [minute, setMinutes] = useState([]);
  // form submit event
  const handleAddmoviesubmit = (e) => {
    e.preventDefault();
    // creating an object for storing the input datas
    let movie = {
      name,
      ratings,
      duration,
      hour,
      minute,
    };
    if (
      movie.name.length > 0 &&
      movie.ratings.length > 0 &&
      movie.duration.length > 0
    ) {
      setMovies([...movies, movie]);
    }

    setName("");
    setRatings("");
    setDuration("");
    setError("");

    // input validaton
    if (name.length == 0 || ratings.length == 0 || duration.length == 0) {
      setError(true);
    }
  };

  // delete movie from LS
  const deletemovie = (duration) => {
    const filteredmovies = movies.filter((element, index) => {
      return element.duration !== duration;
    });
    setMovies(filteredmovies);
  };

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  return (
    <div className="wrapper">
      <div className="main">
        <div className="form-container">
          <form
            autoComplete="off"
            className="form-group"
            onSubmit={handleAddmoviesubmit}
          >
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              autoComplete="off"
              placeholder="Enter movie name..."
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
            <span>
              {error && name.length <= 0 ? (
                <span className="errorMessage">
                  Please enter movie name<sup>*</sup>
                </span>
              ) : (
                ""
              )}
            </span>
            <br></br>
            <label>Rating:</label>
            <input
              type="number"
              className="form-control"
              name="rating"
              autoComplete="off"
              placeholder="Enter movie ratings out of 100"
              min="1"
              max="100"
              onChange={(e) => setRatings(e.target.value)}
              value={ratings}
            ></input>
            <span>
              {error && ratings.length <= 0 ? (
                <span className="errorMessage">
                  Please specify ratings.. <sup>*</sup>
                </span>
              ) : (
                ""
              )}
              {error && ratings >= 100 ? (
                <span className="errorMessage">
                  Please provide a ratings between zero and hundred..{" "}
                  <sup>*</sup>
                </span>
              ) : (
                ""
              )}
            </span>
            <br></br>
            <label>Duration</label>
            <input
              type="number"
              className="form-control"
              name="duration"
              autoComplete="off"
              placeholder="Enter movie duration..."
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
            ></input>
            <span>
              {error && duration.length <= 0 ? (
                <span className="errorMessage">
                  Please specify the time in hours or minutes (e.g. 2.5h or
                  150m) <sup>*</sup>
                </span>
              ) : (
                ""
              )}
            </span>
            <br></br>

            <button type="submit" className="btn btn-success btn-md" id="btn">
              ADD MOVIE
            </button>
          </form>
        </div>

        <div
          className="view-container"
          style={{ visibility: movies.length > 0 ? "visible" : "hidden" }}
        >
          {movies.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Rating</th>
                      <th>Duration</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <MovieList
                      movies={movies}
                      deletemovie={deletemovie}
                      search={search}
                      visible={visible}
                      setVisible={setVisible}
                      duration={duration}
                    />
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-danger btn-md"
                id="btn"
                onClick={() => setMovies([])}
              >
                Remove All
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
