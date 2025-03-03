import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import closeIcon from './closeicon.png';

function AboutUs() {
    return (
        <div className="about-us-container">
            <div className="about-us-header">
                <h1>Contact Us</h1>
                <Link to="/" className="close-btn">
                    <img src={closeIcon} alt="Close" />
                </Link>
            </div>
            <p className="about-us-description">
                Phone number: +48 123 456 789<br/><br/>
                E-mail: ouremail@gmail.com
            </p>
        </div>
    );
}

export default AboutUs;
