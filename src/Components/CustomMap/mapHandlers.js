import axios from "axios";
import { makeGeoUrl, parseCoord } from "../utils";

export const handleChangeRoutesList = (routesList, map) => {
  if (routesList.length < 2) {
    map.current.setCenter(parseCoord(routesList[0].Point.pos), 10, {});
  } else {
    map.current.setBounds(map.current.geoObjects.getBounds(), {
      checkZoomRange: true,
      zoomMargin: 20,
    });
  }
};

export const handleDragEnd = (event, routeIndex, routesList, setRoutesList) => {
  const target = event.get("target");
  const coord = target.geometry.getCoordinates();
  axios.get(makeGeoUrl(coord, true)).then((res) => {
    const item =
      res.data.response.GeoObjectCollection.featureMember[0].GeoObject;
    const replaceList = [...routesList];
    replaceList[routeIndex] = item;
    setRoutesList(replaceList);
  });
};
