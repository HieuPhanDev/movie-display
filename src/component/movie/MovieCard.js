import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const MovieCard = (props) => {
    const { original_title, release_date, vote_average, backdrop_path, id } =
        props;
    const navigate = useNavigate();
    return (
        <>
            <div className="movie-card p-3 bg-slate-700 rounded-lg select-none">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
                    alt=""
                    className="object-cover h-[120px] w-full rounded-lg mb-5"
                />
                <h3 className="text-white font-bold text-xl h-[80px]">
                    {original_title}
                </h3>
                <div className="flex justify-between opacity-50 mb-10">
                    <span className="text-white">
                        {new Date(release_date).getFullYear()}
                    </span>
                    <span className="text-white">{vote_average}</span>
                </div>
                {/* <button
                    className="p-3 rounded-lg bg-pink-600 px-5 text-white w-full"
                    onClick={() => {
                        navigate(`/movie/${id}`);
                    }}
                >
                    Watch
                </button> */}
                <Button
                    children={"Watch"}
                    onClick={() => {
                        navigate(`/movie/${id}`);
                    }}
                    className={'w-full'}
                ></Button>
            </div>
        </>
    );
};

export default MovieCard;
