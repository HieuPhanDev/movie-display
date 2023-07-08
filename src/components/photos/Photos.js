import React, { useEffect, useState } from 'react';
import axios from 'axios';
const getPhotos = async (page) => {
    try {
        const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=12`);
        return (response.data);
    } catch (error) {
        console.log(error);
    }
}
const Photos = () => {
    const [nextPage, setNextPage] = useState(1)
    const handleLoadMoreImage = () => {
        getPhotos(nextPage).then((images) => {
            console.log(images);
            setImages(images);

        });
        setNextPage(nextPage => nextPage + 1)
    }
    const [images, setImages] = useState([])
    useEffect(() => {
        handleLoadMoreImage()
    }, [])

    return (
        <>
            <div className='grid grid-cols-4 gap-5 p-5 '>
                {images.length > 0 && images.map((item, index) => {
                    return (<div key={item.id} className='bg-white p-3 rounded-lg shadow-md'>
                        <img src={item.download_url} alt={item.author} className='w-full h-full rounded-lg' />
                    </div>)
                })}
            </div>
            <button className='px-5 bg-purple-600 py-3 text-white mx-[auto] block' onClick={handleLoadMoreImage}>Load more</button>
        </>

    );
};

export default Photos;