import React from "react";
import RecomendedItem from "./RecomenedItem";
import "./RecomendationsBox.css";

export default function RecomendationsBox(props) {
    function setMatches() {
        if (props.matches.length === 0) {
            return "No product match found. Try adjusting the price or a different food.";
        } else {
            return props.matches.map((item, i) => {
                return (
                    <RecomendedItem
                        key={i}
                        title={item.title}
                        price={item.price}
                        imgUrl={item.imageUrl}
                        description={item.description}
                        link={item.link}
                    />
                );
            });
        }
    }

    return (
        <div className="recomendation-section">
            <h3>Product Recomendation:</h3>
            <div className="matches">{setMatches()}</div>
        </div>
    );
}
