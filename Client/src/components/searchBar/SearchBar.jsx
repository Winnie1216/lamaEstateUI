import { useState } from "react";
import "./searchBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function SearchBar() {
  const types = ["Buy", "Rent"];

  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (item) => {
    setQuery((pre) => ({ ...pre, type: item.toLowerCase() }));
  };

  const handleChange = (e) => {
    setQuery((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((item) => (
          <button
            className={query.type === item.toLowerCase() ? "active" : ""}
            key={item}
            onClick={() => {
              switchType(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <form>
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={handleChange}
        />
        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button>
            <FontAwesomeIcon
              icon={faSearch}
              style={{ color: "white" }}
              className="icon"
            />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
