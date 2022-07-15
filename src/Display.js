import { useEffect, useState } from "react";
import axios from 'axios';
import PropagateLoader  from "react-spinners/PropagateLoader";

function Display({ topic, showNav }) {
    const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(1);
    const [images,setImages] = useState([]);

    useEffect(() => {
        if (topic == "") return
        setLoading(true);
        axios(`https://api.unsplash.com/topics/${topic.id}/photos?page=${page}`,{
            method: "get",
            headers:{
                "Authorization": `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
            }
        }).then(async (response) => {
            await cacheImages(response.data || []);
            setImages((response.data || []).map(i => {
                return {
                    id: i.id,
                    description: i.description,
                    urls: i.urls,
                    links: i.links
                };
            }));
            setLoading(false);
        });
    },[topic,page])

    async function cacheImages(array) {
        return new Promise(async (resolve) => {

            let promises = array.map(i => {
                return new Promise((resolve,reject) => {
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

    return(
        <div className={`display-area ${loading ? 'loading':''}`}>
            {!loading ? images.map(i => {
                return <div key={i.id} className="image-container">
                    <img src={i.urls.regular} alt={i.description}/>
                </div>
            }):<PropagateLoader loading={loading}/>
            }
            <div className={`pointer left ${(showNav || page == 1) ? 'hide':''}`}><i className="fa fa-chevron-left" onClick={() => { setPage(page-1) }}></i></div>
            <div className={`pointer right ${showNav ? 'hide':''}`}><i className="fa fa-chevron-right" onClick={() => {setPage(page+1) }}></i></div>
        </div>
    );
}

export default Display