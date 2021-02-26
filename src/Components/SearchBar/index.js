import React, { useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import axios from "axios";
import classnames from "classnames";
import useDetectOutsideClick from "./useDetectOutsideClick";
import { API_KEY } from "App";

import styles from "./style.sass";
import SearchResults from "Components/SearchResults";

const cx = classnames.bind(styles);

const SearchBar = ({ setRoutesList, routesList }) => {
  const resultsRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useDetectOutsideClick(
    resultsRef,
    false
  );
  const [error, setError] = useState("");

  const handleItemClick = (item) => {
    setRoutesList(routesList.concat([item]));
    setKeyword("");
    if (showResults) setShowResults(false);
  };

  const makeGeoUrl = (geocode) =>
    `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${geocode}`;

  const searchFunction = (value) => {
    if (value.length < 3) {
      setLoading(false);
      setResults([]);
      return setError("Для поиска введите 3 и более символов");
    }
    axios.get(makeGeoUrl(value)).then((res) => {
      const data = [...res.data.response.GeoObjectCollection.featureMember];
      if (data.length > 0) {
        const formattedData = data.reduce((acc, curVal, index) => {
          return acc.concat(curVal.GeoObject);
        }, []);
        setLoading(false);
        setResults(formattedData);
      } else {
        setLoading(false);
        setResults([]);
        setError("По вашему запросу ничего не найдено");
      }
    });
  };
  const debouncedSearchFunction = debounce(searchFunction, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handler = useCallback((value) => debouncedSearchFunction(value), []);
  const reset = () => {
    setResults([]);
    setError("");
  };

  const handleChange = (event) => {
    reset();
    setKeyword(event.target.value);
    setLoading(true);
    if (!showResults) setShowResults(true);
    handler(event.target.value);
  };

  const handleClick = () => {
    if (results) setShowResults(true);
  };

  return (
    <div className={cx("search-bar")}>
      <input
        className={cx("search-bar__input")}
        value={keyword}
        placeholder="Поиск..."
        onClick={handleClick}
        onChange={handleChange}
        ref={resultsRef}
      />
      {showResults && (
        <SearchResults
          items={results}
          loading={loading}
          error={error}
          handleItemClick={handleItemClick}
        />
      )}
    </div>
  );
};

export default SearchBar;
