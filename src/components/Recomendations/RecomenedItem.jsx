import React from "react";
import "./RecommendedItem.css";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function RecomenedItem(props) {
    console.log("PROP PASSING");
    console.log(props);
    return (
        <div className="item-container">
            <div className="wine-img-wrapper">
                <img src={props.imgUrl} alt="wine item" />
            </div>
            <div className="item-right-wrapper">
                <div className="item-info">
                    <h3>{props.title}</h3>
                    <p>{props.price}</p>
                    <p className="item-desc">{props.description}</p>
                </div>
                <p className="cta-icon">
                    <MdKeyboardArrowRight />
                </p>
            </div>
        </div>
    );
}
