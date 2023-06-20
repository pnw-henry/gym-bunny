import React from "react";

function RoutineSearch({ searchTerm, setSearchTerm }) {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search routines..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
}

export default RoutineSearch;
