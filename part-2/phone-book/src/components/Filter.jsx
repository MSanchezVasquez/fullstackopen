function Filter({ textFilter, handleTextFilterChange }) {
  return (
    <div>
      filter shown with{" "}
      <input type="text" value={textFilter} onChange={handleTextFilterChange} />
    </div>
  );
}

export default Filter;
