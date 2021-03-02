import React, { useRef, useEffect } from "react";
import { YMaps, Map, Placemark, Polyline } from "react-yandex-maps";
import { API_KEY } from "../constants";
import { parseCoord } from "../utils";
import { handleDragEnd, handleChangeRoutesList } from "./mapHandlers";
import classnames from "classnames";
import styles from "./style.sass";

const cx = classnames.bind(styles);

const CustomMap = ({ routesList, setRoutesList }) => {
  const map = useRef(null);

  const mapState = {
    center: [55.76, 37.64],
    zoom: 10,
    controls: [],
  };

  useEffect(() => {
    if (routesList.length && !!map.current) {
      handleChangeRoutesList(routesList, map);
    }
  }, [routesList]);

  return (
    <YMaps
      query={{
        apikey: API_KEY,
      }}
    >
      <Map className={cx("map-container")} state={mapState} instanceRef={map}>
        {routesList.map((route, index) => {
          return (
            <Placemark
              key={index}
              geometry={parseCoord(route.Point.pos)}
              properties={{
                balloonContent: route.name,
              }}
              options={{
                draggable: true,
              }}
              onDragEnd={(e) =>
                handleDragEnd(e, index, routesList, setRoutesList)
              }
              modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
            />
          );
        })}
        <Polyline
          geometry={routesList.reduce((acc, curVal) => {
            return [...acc, parseCoord(curVal.Point.pos)];
          }, [])}
          options={{
            strokeColor: "#000",
            strokeWidth: 4,
            strokeOpacity: 0.5,
          }}
        />
      </Map>
    </YMaps>
  );
};

export default CustomMap;
