import React from "react";
import "./PairedWine.css";

export default function PairedWine(props) {
    return (
        <div className="paired-wineEl">
            <p>{props.wineName}</p>
        </div>
    );
}
