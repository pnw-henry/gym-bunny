import React from "react";

function RoutineSearch({ searchTerm, setSearchTerm }) {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search routines..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

export default RoutineSearch;
