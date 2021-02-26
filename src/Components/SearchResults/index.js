import React, { useEffect, useState } from "react";
import classnames from "classnames";
import useKeyPress from "./useKeyPress";
import { ReactComponent as Gear } from "assets/icons/Gear-0.7s-200px.svg";

import styles from "./style.sass";

const cx = classnames.bind(styles);

const SearchResults = ({ items, loading, error, handleItemClick }) => {
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(undefined);
  const [hovered, setHovered] = useState(undefined);

  useEffect(() => {
    if (items.length && downPress) {
      if (cursor || cursor === 0) {
        setCursor((prevState) =>
          prevState < items.length - 1 ? prevState + 1 : prevState
        );
      } else {
        setCursor(0);
      }
    }
  }, [downPress]);
  useEffect(() => {
    if (items.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);
  useEffect(() => {
    if (items.length && enterPress) {
      let index;
      cursor ? (index = cursor) : (index = 0);
      handleItemClick(items[index]);
    }
  }, [cursor, enterPress]);
  useEffect(() => {
    if (items.length && hovered) {
      setCursor(items.indexOf(hovered));
    }
  }, [hovered]);

  const handleMouseLeave = () => {
    setCursor(undefined);
    setHovered(undefined);
  };

  return (
    <div
      className={cx("search-results", {
        "search-results_loading": loading,
      })}
    >
      {loading && <Gear width="60" height="60" />}
      {error && <p className={cx("search-results__list-item")}>{error}</p>}
      {!error && items.length > 0 && (
        <ul className={cx("search-results__list")}>
          {items.map((result, index) => (
            <li
              className={cx("search-results__list-item", {
                "search-results__list-item_active": index === cursor,
                "search-results__list-item_odd": index % 2 !== 0,
              })}
              key={index}
              onClick={() => handleItemClick(result)}
              onMouseEnter={() => setHovered(result)}
              onMouseLeave={handleMouseLeave}
            >
              <p className={cx("search-results__list-item-title")}>
                {result.name}
              </p>
              <p className={cx("search-results__list-item-description")}>
                {result.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
