import { motion } from 'framer-motion';

function Banner({ toggleMenu }) {
    return (
        <div className="top-banner">
            <i onClick={toggleMenu} className="fa fa-bars"></i>
            <motion.h1
                className="title"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
            >
                Smart TV
            </motion.h1>
        </div>
    );
};

export default Banner;