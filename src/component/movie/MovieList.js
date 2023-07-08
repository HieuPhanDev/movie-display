import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MovieCard from "./MovieCard";
import { fetcher } from "../../config";
import useSWR from "swr";
const MovieList = (props) => {
    const { type } = props;
    const { data, error, isLoading } = useSWR(
        `https://api.themoviedb.org/3/movie/${type}?api_key=408af1c22aa95d755ebe1ae38e435d06`,
        fetcher
    );
    if (!data) return null;
    const movie = data.results;
    return (
        <>
            <div className="movie-list">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={"auto"}
                    grabCursor={"true"}
                >
                    {movie.length > 0 &&
                        movie.map((item) => {
                            return (
                                <SwiperSlide key={item.id}>
                                    <MovieCard
                                        original_title={item.original_title}
                                        release_date={item.release_date}
                                        vote_average={item.vote_average}
                                        backdrop_path={item.backdrop_path}
                                        id={item.id}
                                    ></MovieCard>
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </>
    );
};

export default MovieList;
