import React, { useEffect, useState } from "react";
import genreIds from "../Utility/genre";
import Moviecard from "./Moviecard";

function Watchlist({ watchlist, setWatchlist, handleRemoveFromWatchlist }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currentGenre, setCurrentGenre] = useState("All Genres");

  const handleFilter = (genre) => {
    setCurrentGenre(genre);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let sortIncreasing = () => {
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchlist([...sortedIncreasing]);
  };

  let sortDecreasing = () => {
    let sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchlist([...sortedDecreasing]);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreIds[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenreList(["All Genres", ...temp]);
    console.log(temp);
  }, [watchlist]);

  return (
    <>
      <div className="justify-center flex m-4 flex-wrap">
        {genreList.map((genre) => {
          return (
            <div
              onClick={() => handleFilter(genre)}
              className={
                currentGenre === genre
                  ? "flex justify-center text-white bg-blue-500 h-[2rem] w-[6rem] rounded-xl items-center mx-4 hover:cursor-default"
                  : "flex flex-wrap justify-center text-white bg-gray-200 h-[2rem] w-[6rem] rounded-xl items-center mx-4 hover:cursor-default"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center my-3">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
        />
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 m-4">
        <table className="w-full text-center text-gray-500">
          <thead className="border-b-2 border-gray-200">
            <tr>
              <th>Name</th>
              <th className="flex items-center justify-center">
                <div onClick={sortIncreasing} className="p-2">
                  <i class="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">Rating</div>
                <div onClick={sortDecreasing} className="p-2">
                  <i class="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.filter(movieObj => {
                if (currentGenre ==  "All Genres") {
                    return true;
                }
                else{
                    return genreIds[movieObj.genre_ids[0]] === currentGenre;
                }
            })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2 border-gray-200">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6rem] w-[8rem]"
                        src={`https://image.tmdb.org/t/p/w500/${movieObj.poster_path}`}
                      />
                      <span className="mx-10">{movieObj.title}</span>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreIds[movieObj.genre_ids[0]]}</td>
                    <td onClick={() => handleRemoveFromWatchlist(movieObj)} className="hover:cursor-default text-red-400">Delete</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
