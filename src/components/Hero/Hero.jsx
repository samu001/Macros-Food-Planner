import React from "react";
import "./Hero.css";

export default function Hero() {
    return (
        <div className="hero-section">
            <div className="wrapper_">
                <div className="img-container_">
                    <img
                        src={require("../../img/wine1.png")}
                        alt="wine cup logo"
                    />
                </div>
                <h1>Wine Buddy</h1>
            </div>
            <p>
                Find the perfect wine that can fit your next meal! Enter a type
                of food below to get wines recomendation. -Webpage still on
                development-
            </p>
        </div>
    );
}
