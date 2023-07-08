import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
const Movie = lazy(() => import("./component/Pages/Movie"));
const Banner = lazy(() => import("./component/banner/Banner"));
const HomePage = lazy(() => import("./component/Pages/HomePage"));
const MovieDetail = lazy(() => import("./component/Pages/MovieDetail"));

root.render(
    <BrowserRouter>
        <Suspense>
            <Routes>
                <Route path="/" element={<App></App>}>
                    <Route
                        path="/"
                        element={
                            <>
                                <Banner></Banner>
                                <HomePage></HomePage>
                            </>
                        }
                    ></Route>
                    <Route path="/movie" element={<Movie />}></Route>
                    <Route
                        path="/movie/:movieId"
                        element={<MovieDetail />}
                    ></Route>
                </Route>
            </Routes>
        </Suspense>
    </BrowserRouter>
);

reportWebVitals();
