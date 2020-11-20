import React, { useState } from "react";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    setSearchValue("");
  };
  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder="batman"
      />
      <input onClick={callSearchFunction} type="submit" value="Search" />
    </form>
  );
};

export default Search;
