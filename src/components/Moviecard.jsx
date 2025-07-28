import React from "react";
import Watchlist from "./Watchlist";

function Moviecard({
  poster_path,
  name,
  handleAddtoWatchlist,
  movieObj,
  handleRemoveFromWatchlist,
  watchlist,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="relative h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer mt-5 flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => handleRemoveFromWatchlist(movieObj)}
          className="flex m-4 justify-center items-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchlist(movieObj)}
          className="flex m-4 justify-center items-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
        >
          &#129321;
        </div>
      )}

      <div className="absolute bottom-0 text-white text-2xl w-full text-center p-2 bg-gray-900/60">
        {name}
      </div>
    </div>
  );
}

export default Moviecard;
