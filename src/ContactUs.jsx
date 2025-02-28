import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import closeIcon from './closeicon.png';

function AboutUs() {
    return (
        <div className="about-us-container">
            <div className="about-us-header">
                <h1>About Us</h1>
                <Link to="/" className="close-btn">
                    <img src={closeIcon} alt="Close" />
                </Link>
            </div>
            <p className="about-us-description">
                We are a dedicated team providing the best task management system. Our mission is to help teams collaborate efficiently and achieve their goals with ease.
            </p>
        </div>
    );
}

export default AboutUs;
