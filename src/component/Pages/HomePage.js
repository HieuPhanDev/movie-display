import React from 'react';
import MovieList from '../movie/MovieList';

const HomePage = () => {
    return (
        <>
            <div className="movie-layout page-container mb-20">
                <div className="text-white font-bold text-xl mb-5">
                    Now Playing
                </div>
                <MovieList type={"now_playing"}></MovieList>
            </div>
            <div className="movie-layout page-container mb-20">
                <div className="text-white font-bold text-xl mb-6">
                    Top Rate
                </div>
                <MovieList type={"top_rated"}></MovieList>
            </div>
            <div className="movie-layout page-container mb-20">
                <div className="text-white font-bold text-xl mb-6">
                    Trending
                </div>
                <MovieList type={"popular"}></MovieList>
            </div>
        </>
    );
};

export default HomePage;