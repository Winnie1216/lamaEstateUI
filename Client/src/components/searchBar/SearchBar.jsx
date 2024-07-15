import { useState } from "react";
import "./searchBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  const types = ["Buy", "Rent"];

  const [query, setQuery] = useState({
    type: "Buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (item) => {
    setQuery((pre) => ({ ...pre, type: item }));
  };
  return (
    <div className="searchBar">
      <div className="type">
        {types.map((item) => (
          <button
            className={query.type === item ? "active" : ""}
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
        <input type="text" name="location" placeholder="City Location" />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price "
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price "
        />
        <button>
          <FontAwesomeIcon
            icon={faSearch}
            style={{ color: "white" }}
            className="icon"
          />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
