import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import axios from 'axios';

function Menu({ toggleMenu, changeTopic }) {

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        // Fetch all the topics for the menu
        axios("https://api.unsplash.com/topics", {
            method: "get",
            headers: {
                "Authorization": `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
            }
        }).then(response => {
            // Return all I need for the menu
            setTopics((response.data || []).map(e => { return { title: e.title, id: e.id, description: e.description } }))
        });
    }, [])

    return (
        <div className="sliding-menu">
            <div className="menu-icon">
                <motion.i
                    onClick={toggleMenu}
                    className="fa fa-close"
                    whileHover={{ rotate: 180 }}
                >
                </motion.i>
            </div>
            <div className="menu-list">
                {topics.length > 0 &&
                    <ul>
                        {topics.map(e => {
                            return <motion.li
                                key={e.id}
                                className="menu-item"
                                onClick={() => { changeTopic(e) }}
                                title={e.description}
                                whileHover={{ scale: 1.1, x: 50, color: "#fa82c4" }}
                            >
                                {e.title}
                            </motion.li>
                        })}
                    </ul>
                }
            </div>
        </div>
    );
};

export default Menu;