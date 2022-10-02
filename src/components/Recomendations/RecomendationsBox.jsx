import React from "react";
import RecomendedItem from "./RecomenedItem";
import "./RecomendationsBox.css";

export default function RecomendationsBox(props) {
    const matchesEl = props.matches.map((item, i) => {
        return (
            <RecomendedItem
                key={i}
                title={item.title}
                price={item.price}
                imgUrl={item.imageUrl}
                description={item.description}
            />
        );
    });

    return (
        <div className="recomendation-section">
            <h3>Product Recomendation</h3>
            <div className="matches">{matchesEl}</div>
        </div>
    );
}
