import PropTypes from "prop-types";

const SearchBar = ({ placeholder, handleChange }) => {
  return (
    <div className="searchBar col-12 mb-2">
      <input
        type="search"
        className="text-rtl form-control"
        placeholder={placeholder}
        onInput={handleChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SearchBar;
