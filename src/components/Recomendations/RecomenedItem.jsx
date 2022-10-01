import React from "react";
import "./RecommendedItem.css";

export default function RecomenedItem(props) {
    return (
        <div className="rec-item-wrapper">
            <h3>{props.title}</h3>
            <p>{props.price}</p>
            <img src={props.imgUrl} alt="wine item" />
            <p>{props.description}</p>
        </div>
    );
}
