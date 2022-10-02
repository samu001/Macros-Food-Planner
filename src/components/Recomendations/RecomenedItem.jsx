import React from "react";
import "./RecommendedItem.css";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function RecomenedItem(props) {
    function setImgSrc() {
        if (props.title === "") {
            return "https://emojipedia-us.s3.amazonaws.com/source/noto-emoji-animations/344/pensive-face_1f614.gif";
        } else {
            return props.imgUrl;
        }
    }

    return (
        <div className="item-container">
            <div className="wine-img-wrapper">
                <img src={setImgSrc()} alt="wine item" />
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
