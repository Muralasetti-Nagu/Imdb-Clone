import React, { useEffect } from 'react'
import Moviecard from './Moviecard'
import axios from 'axios'
import { useState } from 'react'
import Pagination from './Pagination'

function Movies({handleAddtoWatchlist, handleRemoveFromWatchlist, watchlist}) {

  const [movies, setMovies] = useState([])
  const [pageNo, setPageNo] = useState(1)

  const handlePrev = () => {
    if (pageNo === 1) {
      setPageNo(pageNo)
    }
    else{
      setPageNo(pageNo - 1)
    }
  }

  const handleNext = () => {
    setPageNo(pageNo + 1)
  }

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f3ed070724814546c9f2565420feda86&language=en-US&page=${pageNo}`).then(function(res){
      setMovies(res.data.results)
    })
  } , [pageNo])
  
  return (
    <div className='p-4'>
      <div className='text-center font-bold m-4 text-2xl'>
        Trending Movies
      </div>
      <div className='flex flex-row flex-wrap justify-around'>
        {movies.map((movieObj) => {
          return <Moviecard key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_title} handleAddtoWatchlist={handleAddtoWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist} watchlist={watchlist} />
        })}
      </div>

      <Pagination pageNo={pageNo} handlePrev={handlePrev} handleNext={handleNext}/>

    </div>
  )
}

export default Movies