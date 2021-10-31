import { atom } from "recoil";

export const playState = atom({
  key: "playState",
  default: false,
});

export const playingTrackState = atom({
  key: "playingTrackState",
  default: "",
});
