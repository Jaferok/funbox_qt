import { handleChangeRoutesList, handleDragEnd } from "./mapHandlers";
import axios from "axios";

jest.mock("axios");

describe("Map Func", () => {
  test("handle drag end", async () => {
    const event = {
      get() {
        return {
          geometry: {
            getCoordinates: () => [57.3213213, 42.3213213],
          },
        };
      },
    };
    const routeIndex = 1;
    let routesList = [
      { coords: [12.333333, 23.444444] },
      { coords: [55.111111, 22.666666] },
    ];
    const setRoutesList = (x) => (routesList[routeIndex] = x);
    const resp = {
      data: {
        response: {
          GeoObjectCollection: {
            featureMember: [
              { GeoObject: { coords: [57.3213213, 42.3213213] } },
            ],
          },
        },
      },
    };
    axios.get.mockResolvedValue(resp);

    handleDragEnd(event, routeIndex, routesList, setRoutesList);
  });

  test("handle change routes list", async () => {
    const map = {
      current: {
        setCenter() {
          return true;
        },
        setBounds() {
          return true;
        },
        geoObjects: {
          getBounds() {
            return true;
          },
        },
      },
    };
    let routesList = [{ Point: { pos: "32.2222 54.2222" } }];
    handleChangeRoutesList(routesList, map);

    routesList = [
      { Point: { pos: "32.2222 54.2222" } },
      { Point: { pos: "32.2222 54.2222" } },
    ];

    handleChangeRoutesList(routesList, map);
  });
});
