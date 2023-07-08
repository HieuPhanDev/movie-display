import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import MovieCard from "../movie/MovieCard";
import { useDebounce } from "use-debounce";
import Pagination from "../pagination/Pagination";
let PageSize = 10;
// https://api.themoviedb.org/3/search/movie/query=${filterDebounce}?api_key=408af1c22aa95d755ebe1ae38e435d06
const Movie = () => {
    const [filter, setFilter] = useState([]);
    const [page, setPage] = useState(1);
    const [url, setUrl] = useState(
        `https://api.themoviedb.org/3/movie/popular?api_key=408af1c22aa95d755ebe1ae38e435d06&page=${page}`
    );
    const handleFilter = (event) => {
        setFilter(event.target.value);
        setPage(1);
    };
    const filterDebounce = useDebounce(filter, 1000);

    useEffect(() => {
        if (filterDebounce[0].length > 0) {
            setUrl(
                `https://api.themoviedb.org/3/search/movie?api_key=408af1c22aa95d755ebe1ae38e435d06&query=${filterDebounce[0]}&page=${page}`
            );
        } else {
            setUrl(
                `https://api.themoviedb.org/3/movie/popular?api_key=408af1c22aa95d755ebe1ae38e435d06&page=${page}`
            );
        }
    }, [filterDebounce[0], page]);

    const { data, isLoading } = useSWR(url, fetcher);
    if (!data || !data.results) return null;
    const movie = data.results;
    return (
        <>
            <div className="mb-10 flex relative max-w-[1280px] mx-auto">
                <input
                    type="text"
                    placeholder="search"
                    className="p-3 bg-slate-800 w-full text-white"
                    onChange={handleFilter}
                    value={filter}
                />
                <div className="absolute right-0 p-3 bg-red-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 "
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
            </div>
            {isLoading && (
                <div className="flex justify-center items-center">
                    <div className="grid gap-2">
                        <div className="flex items-center justify-center space-x-2 animate-pulse">
                            <div className="w-8 h-8 bg-red-700 rounded-full"></div>
                            <div className="w-8 h-8 bg-red-700 rounded-full"></div>
                            <div className="w-8 h-8 bg-red-700 rounded-full"></div>
                        </div>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-4 gap-5 mb-10">
                {!isLoading &&
                    movie.length > 0 &&
                    movie.map((item) => {
                        return (
                            <div key={item.id}>
                                <MovieCard
                                    original_title={item.original_title}
                                    release_date={item.release_date}
                                    vote_average={item.vote_average}
                                    backdrop_path={item.backdrop_path}
                                    id={item.id}
                                ></MovieCard>
                            </div>
                        );
                    })}
            </div>
            }
            <div className="flex text-white gap-x-5 justify-center mb-10 text-xl">
                <Pagination
                    className="pagination-bar"
                    currentPage={page}
                    totalCount={
                        data.total_results / 2 < 5000
                            ? data.total_results / 2
                            : 5000
                    }
                    pageSize={PageSize}
                    onPageChange={(page) => setPage(page)}
                ></Pagination>
            </div>
        </>
    );
};

export default Movie;
