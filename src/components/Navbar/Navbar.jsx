import React, { useState } from 'react';
import olxLogo from '../../assets/symbol.png';
import lens from '../../assets/search1.svg';
import arrow from '../../assets/arrow-down.svg';
import search from "../../assets/search.svg";
import sellButton from '../../assets/addButton.png';
import locationIcon from '../../assets/location.svg';
import './Navbar.css';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
   
    const {  logout } = useUser();
    const navigate=useNavigate()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [location, setLocation] = useState("Search city, area or locality");
    const [loginPop, setLoginPop] = useState(false);
    const username = localStorage.getItem('username');
    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const selectLocation = (selectedLocation) => {
        setLocation(selectedLocation);
        setIsDropdownOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        console.log("removed");
        
       logout()
    };

    return (
        <>
            <nav className="navbar">
                <img src={olxLogo} alt="Logo" className="logo" />
                <div className="location-search">
                    <img src={lens} alt="Lens" className="lens-icon" />
                    <input
                        placeholder={location}
                        className="location-input"
                        type="text"
                    />
                    <img
                        src={arrow}
                        alt="Arrow"
                        className={`arrow-icon ${isDropdownOpen ? 'rotate' : ''}`}
                        onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                        <div className="dropdown">
                            <ul className="dropdown-list">
                                {["Kerala", "Mumbai", "Delhi", "Bangalore", "Chennai"].map((loc) => (
                                    <li
                                        key={loc}
                                        className="dropdown-item"
                                        onClick={() => selectLocation(loc)}
                                    >
                                        <img src={locationIcon} className="location-icon" alt="Location Icon" />
                                        {loc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="search-bar">
                    <input
                        placeholder="Find Cars, Mobile Phones and More...."
                        className="search-input"
                    />
                    <div className="search-icon-container">
                        <img className="search-icon" src={search} alt="Search Icon" />
                    </div>
                </div>

                <div className="language-selector">
                    <p className="language-text">ENGLISH</p>
                    <img className="arrow-icon" src={arrow} alt="Arrow Icon" />
                </div>

               {username ? <p onClick={handleLogout}>LogOut</p> :<p
                    className="auth-text"
                    onClick={()=>navigate('/login')}
                >
                    Login
                </p>
}
                <img
                    src={sellButton}
                    alt="Sell Button"
                    className="sell-button"
                    onClick={()=>navigate('/sell')}
                />
                {loginPop && <Login setLoginPop={setLoginPop} />}
            </nav>

            {/* Categories Section */}
            <div className="categories">
                <ul className="category-list">
                    <div className="all-categories">
                        <p className="category-text">All categories</p>
                        <img className="arrow-icon" src={arrow} alt="Arrow" />
                    </div>
                    {[
                        "Cars",
                        "Motorcycles",
                        "Mobile Phones",
                        "For sale : Houses & Apartments",
                        "Scooter",
                        "Commercial & Other Vehicles",
                        "For rent : Houses & Apartments",
                    ].map((category) => (
                        <li key={category} className="category-item">{category}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Navbar;
