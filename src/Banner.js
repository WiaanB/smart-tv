function Banner({ toggleMenu }) {
    return (
        <div className="top-banner">
            <i onClick={toggleMenu} className="fa fa-bars"></i>
            <h1 className="title">Smart TV</h1>
        </div>
    );
};

export default Banner;