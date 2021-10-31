import Playlist from "./Playlist";
import Search from "./Search";
import Sidebar from "./Sidebar";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { ViewGridIcon } from "@heroicons/react/solid";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import Track from "./Track";
import SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";
import Dropdown from "./Dropdown";
import Player from "./Player";
import { playingTrackState } from "../atoms/playerAtom";
import { useRecoilState } from "recoil";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

function Dashboard() {
  const { data: session } = useSession();
  const { accessToken } = session;
  const [search, setSearch] = useState("six feet under");
  const [searchResults, setSearchResults] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Searching...
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  // Recently Played Tracks...
  useEffect(() => {
    if (!accessToken) return;
    let cancel = false;

    spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
      if (cancel) return;
      setRecentlyPlayed(
        res.body.items.map(({ track }) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [accessToken]);

  console.log(session);

  return (
    <main className="flex min-h-screen w-full bg-black pb-24">
      <Sidebar />
      {/* Middle */}
      <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
        <Search search={search} setSearch={setSearch} />
        <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
          {searchResults.slice(0, 4).map((track) => (
            <Playlist key={track.id} track={track} chooseTrack={chooseTrack} />
          ))}
        </div>

        <div className="flex ml-5 lg:ml-0 gap-x-8 absolute md:relative">
          {/* Genres */}
          <div className="hidden lg:inline max-w-[260px]">
            <h2 className="text-white font-bold mb-3">Genres</h2>
            <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3">
              <div className="genre">Classic</div>
              <div className="genre">House</div>
              <div className="genre">Minimal</div>
              <div className="genre">Hip-hop</div>
              <div className="genre">Electronic</div>
              <div className="genre">Chillout</div>
              <div className="genre">Blues</div>
              <div className="genre">Country</div>
              <div className="genre">Techno</div>
            </div>
            <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold">
              All Genres
            </button>
          </div>

          {/* Tracks of the Week */}
          <div className="w-full lg:max-w-[850px]">
            <h2 className="text-white font-bold mb-3">Tracks</h2>
            <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 ">
              {searchResults.slice(4, searchResults.length).map((track) => (
                <Track key={track.id} track={track} chooseTrack={chooseTrack} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Right */}
      <section className="p-4 space-y-8 h-96 pr-8">
        <div className="flex space-x-2.5 items-center justify-between">
          {/* Icons */}
          <div className="flex items-center space-x-3 border-2 border-[#262626] rounded-full py-3 px-4">
            <HiOutlineShieldCheck className="text-[#CCCCCC] text-xl" />
            <MdOutlineSettings className="text-[#CCCCCC] text-xl" />
            <div>
              <BiBell className="text-[#CCCCCC] text-xl" />
            </div>
          </div>
          {/* Profile */}
          <Dropdown />
        </div>

        {/* Recently Played Tracks */}
        <div className="bg-[#212121] p-4 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-semibold text-sm">
              Recently Played
            </h4>
            <ViewGridIcon className="text-[#686868] h-6" />
          </div>

          <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[250px] md:h-[400px] scrollbar-hide">
            {recentlyPlayed.map((track, index) => (
              <Profile key={index} track={track} chooseTrack={chooseTrack} />
            ))}
          </div>
          <button className="text-[#CECECE] bg-[#383838] text-[13px] py-3 px-4 rounded-2xl w-full font-bold">
            View All
          </button>
        </div>
      </section>

      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0">
          <Player accessToken={accessToken} trackUri={playingTrack.uri} />
        </div>
      )}
    </main>
  );
}

export default Dashboard;
