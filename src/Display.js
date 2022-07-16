import { useEffect, useState } from "react";
import axios from 'axios';
import PropagateLoader from "react-spinners/PropagateLoader";
import { motion } from 'framer-motion';

function Display({ topic, showNav }) {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [counter, setCounter] = useState(10);
    const [columns, setColumns] = useState([0, 9])

    // Fetch Initial Images
    useEffect(() => {
        if (topic == "") return
        setLoading(true);
        axios(`https://api.unsplash.com/topics/${topic.id}/photos?page=${page}&per_page=20`, {
            method: "get",
            headers: {
                "Authorization": `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
            }
        }).then(async (response) => {
            // Cache the images and map to only save the properties I need
            await cacheImages(response.data || []);
            setImages((response.data || []).map(i => {
                return {
                    id: i.id,
                    description: i.description,
                    urls: i.urls,
                    links: i.links
                };
            }));
            // Adjust the page the page 3, as I initially fetch 2
            setPage(page + 2);
            setLoading(false);
        }).catch(() => {
            console.warn('Failed to fetch resource!');
            setLoading(false);
        });
    }, [topic]);

    // Fetch Images Based on Page
    useEffect(() => {
        // Prevent the function from fetching additional pages on first load
        if (images.length == 0) return
        // If there are 3 rows preloaded, fetch more and add them to the array
        if (counter == images.length - 6) {
            axios(`https://api.unsplash.com/topics/${topic.id}/photos?page=${page}&per_page=10`, {
                method: "get",
                headers: {
                    "Authorization": `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
                }
            }).then(async (response) => {
                // Adjust the page the page 3, as I initially fetch 2
                await cacheImages(response.data || []);
                setImages(images.concat((response.data || []).map(i => {
                    return {
                        id: i.id,
                        description: i.description,
                        urls: i.urls,
                        links: i.links
                    };
                })));
                setPage(page + 1);
            }).catch(() => {
                console.warn('Failed to fetch resource!');
            });
        }
    }, [counter])

    // This will preload all the images into cache
    async function cacheImages(array) {
        return new Promise(async (resolve) => {

            let promises = array.map(i => {
                return new Promise((resolve, reject) => {
                    // Caches the image
                    const img = new Image();
                    img.src = i.urls.full;
                    img.onload = resolve();
                    img.onerror = reject();
                });
            });

            await Promise.all(promises);
            resolve();
        });
    }

    function moveColumns(direction) {
        if (direction == 'right') {
            // If right, adjust the paged counter and set the columns to move 2 indices onwards
            setCounter(counter + 2)
            setColumns([columns[0] + 2, columns[1] + 2])
        } else {
            // If left, adjust the paged counter and set the columns to move 2 indices backwards
            setCounter(counter - 2)
            setColumns([columns[0] - 2, columns[1] - 2])
        }
    }

    function openLink(url) {
        // Open the image URL
        window.open(url, '_blank').focus();
    }

    return (
        <div className={`display-area ${loading ? 'loading' : ''}`}>
            {!loading ? images.map((i, idx) => {
                if (idx >= columns[0] && idx <= columns[1]) {
                    return <div key={i.id} className="image-container">
                        <motion.img
                            src={i.urls.regular}
                            alt={i.description}
                            whileHover={{ scale: 1.1, boxShadow: "15px 15px 15px black;" }}
                            onClick={() => { openLink(i.links.html) }}
                        />
                    </div>
                }
            }) : <PropagateLoader loading={loading} color={"rgb(255,255,255)"} />
            }
            <div className={`pointer left ${(showNav || counter == 10) ? 'hide' : ''}`}>
                <motion.i
                    className="fa fa-chevron-left"
                    onClick={() => { moveColumns("left") }}
                    whileHover={{ scale: 1.2, color: 'rgb(255,255,255)' }}
                />
            </div>
            <div className={`pointer right ${showNav ? 'hide' : ''}`}>
                <motion.i
                    className="fa fa-chevron-right"
                    onClick={() => { moveColumns("right") }}
                    whileHover={{ scale: 1.2, color: 'rgb(255,255,255)' }}
                />
            </div>
        </div>
    );
}

export default Display