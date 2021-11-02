import { useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";
import {
  BsFillPlayFill,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
} from "react-icons/bs";
import { FiVolume2 } from "react-icons/fi";
import { RiPlayList2Fill, RiComputerLine } from "react-icons/ri";
import { MdOutlineSpeaker } from "react-icons/md";
import { BiShuffle } from "react-icons/bi";
import { IoRepeatOutline } from "react-icons/io5";
import { CgArrowsExpandRight } from "react-icons/cg";

function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  useEffect(() => {
    if (trackUri) {
      setPlay(true);
    }
  }, [trackUri]);

  if (!accessToken) return null;

  return (
    <>
      {/* Free Users */}
      {/* <div className="bg-[#181818] flex items-center justify-between px-5 py-2.5 rounded-t-2xl relative space-x-20 md:space-x-0 overflow-x-scroll md:overflow-x-hidden scrollbar-hide">
        <div className="flex items-center">
          <img
            src={playingTrack.albumUrl}
            alt=""
            className="h-14 rounded-xl mr-3"
          />
          <div>
            <h4 className="text-white text-sm max-w-[150px] md:max-w-[250px] truncate">
              {playingTrack.title}
            </h4>
            <h5 className="text-xs text-[rgb(179,179,179)]">
              {playingTrack.artist}
            </h5>
          </div>
        </div>
        Controls
        <div className="flex flex-col space-y-2 items-center md:absolute inset-x-auto w-full">
          <div className="flex items-center text-[#b3b3b3] text-xl space-x-4">
            <BiShuffle className="text-lg playerIcon" />
            <BsFillSkipStartFill className="playerIcon" />
            <div className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center playerIcon hover:text-black">
              <BsFillPlayFill className="ml-[1px]" />
            </div>
            <BsFillSkipEndFill className="playerIcon" />
            <IoRepeatOutline className="playerIcon" />
          </div>

          <div className="flex items-center space-x-2.5 text-xs text-[#CECECE]">
            <h4 className="-mt-0.5">0:00</h4>
            <div className="bg-[#383838] w-72 lg:w-[450px] h-1 rounded-xl" />
            <h4 className="-mt-0.5">0:00</h4>
          </div>
        </div>
        Icons
        <div className="text-[#b3b3b3] flex items-center space-x-3">
          <RiPlayList2Fill className="playerIcon" />
          <div className="flex items-center playerIcon">
            <RiComputerLine className="croppedIcon" />
            <MdOutlineSpeaker className="-ml-2.5" />
          </div>
          <div className="flex items-center space-x-3">
            <FiVolume2 className="text-[#b3b3b3] text-xl playerIcon" />
            <div className="bg-[#383838] w-[88px] h-1 rounded-xl">
              <div className="bg-[#b3b3b3] w-14 h-1 rounded-xl" />
            </div>
          </div>
          <CgArrowsExpandRight className="playerIcon" />
        </div>
      </div> */}

      {/* Premium Users */}
      <SpotifyPlayer
        styles={{
          activeColor: "#fff",
          bgColor: "#181818",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
          height: "70px",
          sliderTrackColor: "#535353",
          sliderTrackBorderRadius: "4px",
          sliderHandleColor: "#fff",
          errorColor: "#fff",
        }}
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          setPlay(state.isPlaying);
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
        magnifySliderOnHover={true}
        autoPlay={true}
      />
    </>
  );
}

export default Player;
