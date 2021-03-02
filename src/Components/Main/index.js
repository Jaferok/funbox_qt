import React, { useState } from "react";
import classnames from "classnames";

import SearchBar from "../SearchBar";
import RoutesList from "Components/RoutesList";
import styles from "./style.sass";
import CustomMap from "Components/CustomMap";

const cx = classnames.bind(styles);

const Main = () => {
  const [routesList, setRoutesList] = useState([]);

  const handleRemove = (item) => {
    const newRoutes = routesList.filter(
      (route) => route.Point.pos !== item.Point.pos
    );
    setRoutesList(newRoutes);
  };

  return (
    <div className={cx("main-content")}>
      <div className={cx("placemarks")}>
        <SearchBar setRoutesList={setRoutesList} routesList={routesList} />
        {!!routesList.length && (
          <RoutesList
            routes={routesList}
            setRoutesList={setRoutesList}
            handleRemove={handleRemove}
          />
        )}
      </div>
      <CustomMap routesList={routesList} setRoutesList={setRoutesList} />
    </div>
  );
};

export default Main;
