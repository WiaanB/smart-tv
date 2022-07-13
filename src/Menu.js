import { useEffect, useState } from "react";
import axios from 'axios';

function Menu({ toggleMenu }) {

    const [topics,setTopics] = useState([]);

    useEffect(() => {
        axios("https://api.unsplash.com/topics",{
            method: "get",
            headers:{
                "Authorization": `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
            }
        }).then(response => {
            setTopics((response.data || []).map(e => e.title))
        });
    },[])

    return (
        <div className="sliding-menu">
            <div className="menu-icon">
                <i onClick={toggleMenu} className="fa fa-close"></i>
            </div>
            <div className="menu-list">
                {topics.length &&
                <ul>
                    {topics.map(e => {
                        return <li className="menu-item">{e}</li>
                    })}
                </ul>
                }
            </div>
        </div>
    );
};

export default Menu;