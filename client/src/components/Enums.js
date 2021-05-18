// the query to get season for anime wants an enum type so I make this file

const MediaSeason = {
  WINTER: "WINTER",
  SPRING: "SPRING",
  SUMMER: "SUMMER",
  FALL: "FALL",
};

Object.freeze(MediaSeason);
const MediaSource = {
  ANIME: "ANIME",
};
module.exports = {
  MediaSeason,
  MediaSource,
};
