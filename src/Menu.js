import { useEffect, useState } from "react";
import axios from 'axios';

function Menu({ toggleMenu, changeTopic }) {

    const [topics,setTopics] = useState([]);

    useEffect(() => {
        axios("https://api.unsplash.com/topics",{
            method: "get",
            headers:{
                "Authorization": `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
            }
        }).then(response => {
            setTopics((response.data || []).map(e => { return {title: e.title, id: e.id, description: e.description} }))
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
                        return <li key={e.id} className="menu-item" onClick={() => {changeTopic(e)}} title={e.description}>{e.title}</li>
                    })}
                </ul>
                }
            </div>
        </div>
    );
};

export default Menu;