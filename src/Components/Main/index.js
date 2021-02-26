import React, { useState, useRef, useEffect } from "react";
import { Map, Placemark, Polyline } from "react-yandex-maps";
import classnames from "classnames";
import axios from "axios";
import { API_KEY } from "App";
import SearchBar from "../SearchBar";
import RoutesList from "Components/RoutesList";
import styles from "./style.sass";

const cx = classnames.bind(styles);

const Main = () => {
  const [routesList, setRoutesList] = useState([]);
  const map = useRef(null);

  const parseCoord = (coord) => {
    const splitted = coord.split(" ");
    return [Number.parseFloat(splitted[1]), Number.parseFloat(splitted[0])];
  };

  useEffect(() => {
    if (routesList.length && !!map.current) {
      if (routesList.length < 2) {
        map.current.setCenter(parseCoord(routesList[0].Point.pos), 10, {});
      } else {
        map.current.setBounds(map.current.geoObjects.getBounds(), {
          checkZoomRange: true,
          zoomMargin: 20,
        });
      }
    }
  }, [routesList]);

  const mapState = {
    center: [55.76, 37.64],
    zoom: 10,
    controls: [],
  };
  const handleRemove = (item) => {
    const newRoutes = routesList.filter(
      (route) => route.Point.pos !== item.Point.pos
    );
    setRoutesList(newRoutes);
  };

  const makeGeoUrl = (geocode) =>
    `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${geocode[1]},${geocode[0]}`;

  const handleDragEnd = (event, routeIndex) => {
    const target = event.get("target");
    const coord = target.geometry.getCoordinates();
    axios.get(makeGeoUrl(coord)).then((res) => {
      const item =
        res.data.response.GeoObjectCollection.featureMember[0].GeoObject;
      const replaceList = [...routesList];
      replaceList[routeIndex] = item;
      setRoutesList(replaceList);
    });
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
              onDragEnd={(e) => handleDragEnd(e, index)}
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
    </div>
  );
};

export default Main;
