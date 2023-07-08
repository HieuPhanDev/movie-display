import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Url, apiKey, fetcher } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../movie/MovieCard";
import "swiper/css";

const MovieDetail = () => {
    const param = useParams();
    const { data } = useSWR(
        `${Url}/${param.movieId}?api_key=${apiKey}`,
        fetcher
    );
    if (!data) return null;
    const { backdrop_path, poster_path, title, genres, overview } = data;
    console.log(data)
    return (
        <>
            <div className="mb-10">
                <div
                    className="h-[550px] bg-no-repeat blur-sm bg-cover rounded-lg"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
                    }}
                ></div>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt=""
                    className="h-[550px] mx-auto rounded-lg -mt-[250px] z-10 relative"
                />
            </div>
            <div className="text-white text-center text-3xl font-bold mb-10">
                {title}
            </div>
            <div className="flex justify-center gap-x-10 mb-5">
                {genres &&
                    genres.map((item) => {
                        return (
                            <h3
                                className="text-blue-600 py-2 px-4 border border-blue-400 rounded-lg"
                                key={item.id}
                            >
                                {item.name}
                            </h3>
                        );
                    })}
            </div>
            <div className="text-white font-normal mx-auto max-w-[800px] mb-5">
                {overview}
            </div>
            <div className="text-white font-bold text-2xl text-center mb-5">
                Casts
            </div>
            <MovieCredit></MovieCredit>
            <div className="text-white px-4 py-1 bg-purple-400 inline-block mb-5 rounded-lg ml-[150px]">
                Trailer Preview
            </div>
            <MovieCreditVideo></MovieCreditVideo>
            <div className="text-white font-bold text-2xl text-center mb-5">
                Similar Movie
            </div>
            <SimilarMovie></SimilarMovie>
        </>
    );
};

const MovieCredit = () => {
    const param = useParams();
    const { data } = useSWR(
        `${Url}/${param.movieId}/credits?api_key=${apiKey}`,
        fetcher
    );
    if (!data) return null;
    // console.log(data.cast);

    return (
        <>
            <div className="grid grid-cols-6 max-w-[1280px] mx-auto mb-10">
                {data.cast &&
                    data.cast.slice(0, 12).map((item) => {
                        return (
                            <div key={item.id}>
                                {item.profile_path && (
                                    <div>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                                            alt=""
                                            className="h-[240px] rounded-lg "
                                        />
                                        <div className="text-gray-300 ">
                                            {item.name}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

const MovieCreditVideo = () => {
    const param = useParams();
    const { data } = useSWR(
        `${Url}/${param.movieId}/videos?api_key=${apiKey}`,
        fetcher
    );
    if (!data||!data.results||!data.results[0]) return null;
    // console.log(data)
    // console.log(param.movieId);

    return (
        <div>
            <iframe
                width="900"
                height="506"
                src={`https://www.youtube.com/embed/${data.results[0].key}`}
                title="[Auto] Reg TikTok Chrome Gmail - Auto UpAvatar - Auto Solve Captcha"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="mx-auto mb-10 rounded-md"
            ></iframe>
        </div>
    );
};

const SimilarMovie = () => {
    const param = useParams();
    const { data } = useSWR(
        `${Url}/${param.movieId}/similar?api_key=${apiKey}`,
        fetcher
    );
    if (!data) return null;
    const movie = data.results;
    return (
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
    );
};

export default MovieDetail;
