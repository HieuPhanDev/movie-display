import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { fetcher } from "../../config";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const Banner = () => {
    const navigate = useNavigate();
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    const { data, error, isLoading } = useSWR(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=408af1c22aa95d755ebe1ae38e435d06`,
        fetcher
    );
    if (!data) return null;
    const movie = data.results;
    // console.log(movie);
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                {movie &&
                    movie.map((item, index) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                                    alt=""
                                    className="w-full h-full rounded-lg object-cover blur-sm"
                                />
                                <div className="absolute bottom-5 left-5">
                                    <h2 className="font-bold text-3xl text-white mb-5">
                                        {item.title}
                                    </h2>
                                    <div className="flex gap-x-4 mb-8">
                                        <span className="border border-white text-white p-2 rounded-lg">
                                            Adventure
                                        </span>
                                        <span className="border border-white text-white p-2 rounded-lg">
                                            Adventure
                                        </span>
                                        <span className="border border-white text-white p-2 rounded-lg">
                                            Adventure
                                        </span>
                                    </div>
                                    
                                    <Button
                                        children={"Watch Now"}
                                        onClick={() => {
                                            navigate(`/movie/${item.id}`);
                                        }}
                                        className={'w-[200px]'}
                                    ></Button>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                <div className="autoplay-progress" slot="container-end">
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </>
    );
};

export default Banner;
