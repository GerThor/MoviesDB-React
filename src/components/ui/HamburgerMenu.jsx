import React, { useState } from 'react';
import '../../index.css'; // Import your CSS file for styling
import { Link } from "react-router-dom"

function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false); // State to manage menu open/close

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle the menu state
    };

    return (
        <div className="hamburger-menu">
            <button className="hamburger" onClick={toggleMenu}>
                {isOpen ? '✖' : '☰'} {/* Change icon based on state */}
            </button>
            {isOpen && (
                <nav className="menu">
                    <ul className="menu__hamburger--links">
                        <Link to="/" className="hamburger__menu--link">Home</Link>
                        <Link to="/movies" className="hamburger__menu--link">Find Your Movie</Link>
                        <Link className="hamburger__menu--link hamburger__menu--link-contact">Contact</Link> {/* link to go nowhere */}
                    </ul>
                </nav>
            )}
        </div>
    );
}

export default HamburgerMenu;
