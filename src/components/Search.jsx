import "../styles/Search.css";
export const Search = ({ setSearch }) => {
  return (
    <>
      <form action="" className="searchForm">
        <input
          className="searchInput"
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search Your Favorite Movie....."
          aria-label="Search"
        />
        <i className="fa fa-search"></i>
      </form>
    </>
  );
};
