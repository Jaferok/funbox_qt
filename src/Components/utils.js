import { API_KEY } from "./constants";

export const parseCoord = (coord) => {
  const splitted = coord.split(" ");
  return [Number.parseFloat(splitted[1]), Number.parseFloat(splitted[0])];
};

export const makeGeoUrl = (geocode, reverse) =>
  reverse
    ? `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${geocode[1]},${geocode[0]}`
    : `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${geocode}`;
