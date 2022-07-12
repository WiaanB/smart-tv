function Menu({ toggleMenu }) {
    return (
        <div className="sliding-menu">
            <i onClick={toggleMenu} className="fa fa-close"></i>
        </div>
    );
};

export default Menu;