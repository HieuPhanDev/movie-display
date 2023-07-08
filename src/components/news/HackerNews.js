import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
const HackerNews = () => {
    const [hits, setHits] = useState([]);
    const [query, setQuery] = useState("");
    const handleFetchData = useRef({});
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [url, setUrl] = useState(
        `https://hn.algolia.com/api/v1/search?query=${query}`
    );
    handleFetchData.current = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setHits(response.data.hits);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrorMessage(error.message);
        }
    };
    
    useEffect(() => {
        handleFetchData.current();
    }, [url]);
    // const handleUpdateQuery = lodash.debounce((event)=>{
    //     setQuery(event.target.value);
    // },500)
    return (
        <div>
            <input
                type="text"
                className="border border-gray-600"
                defaultValue={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                }}
            />
            <button
                onClick={(event) =>
                    setUrl(
                        `https://hn.algolia.com/api/v1/search?query=${query}`
                    )
                }
            >
                Search
            </button>
            {loading && <p>Loading...</p>}
            {!loading && errorMessage && <p>{errorMessage}</p>}
            {!loading &&
                hits.length > 0 &&
                hits.map((item, index) => {
                    return <h3 key={item.title}>{item.title}</h3>;
                })}
        </div>
    );
};

export default HackerNews;
