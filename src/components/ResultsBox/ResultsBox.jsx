import React from "react";
import "./ResultsBox.css";
import PairedWine from "../PairedWine/PairedWine";

export default function ResultsBox(props) {
    const pairedWinesArr = props.wineInfo.winesArr;
    const description = props.wineInfo.pairText;

    const pairedWinesEl = pairedWinesArr.map((item, key) => {
        return <PairedWine key={key} wineName={item} />;
    });

    return (
        <div className="results-container">
            <h3>Wines that go well with {props.searchQuery}:</h3>
            <div className="paired-wines-container">{pairedWinesEl}</div>
            <div className="desc">{description}</div>
        </div>
    );
}
