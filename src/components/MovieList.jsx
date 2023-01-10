import { FcFullTrash } from "react-icons/fc";
export const MovieList = ({ movies, deletemovie, search }) => {
  function timeConvert(duration) {
    var hours = Math.floor(duration / 60);
    var minutes = duration % 60;
    return `${hours}:${minutes}`;
  }

  return movies
    .filter((searchkeyword) => {
      return search.toLowerCase() === "" || search.length <= 2
        ? searchkeyword
        : search.length > 2 &&
            searchkeyword.name.toLowerCase().includes(search);
    })
    .sort(function (a, b) {
      return a.duration - b.duration;
    })
    .map((movie) => (
      <>
        {Object.getOwnPropertyNames(movie).length === 0 ? (
          <h1>not found</h1>
        ) : (
          <tr key={movie.name}>
            <td>{movie.name}</td>
            <td>{movie.ratings}</td>
            <td>{timeConvert(movie.duration)} Hrs</td>
            <td
              className="delete-btn"
              onClick={() => deletemovie(movie.duration)}
            >
              <FcFullTrash className="trashIcon" />
            </td>
          </tr>
        )}
      </>
    ));
};
