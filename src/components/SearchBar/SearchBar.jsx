import { useEffect, useState } from "react";
import "./SearchBar.css";

import RecomendationsBox from "../Recomendations/RecomendationsBox";
import ResultsBox from "../ResultsBox/ResultsBox";

export default function SearchBar() {
    const API_KEY = "9f9874c4519949798c78d38210fba603";

    const noMatchObj = {
        imageUrl:
            "https://emojipedia-us.s3.amazonaws.com/source/noto-emoji-animations/344/pensive-face_1f614.gif",
    };

    const [isLoading, setIsLoading] = useState(false);
    const [pairedWines, setPairedWines] = useState([]);
    const [productMatches, setProductMatches] = useState([]);
    const [foodText, setFoodText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [initialPage, setInitialPage] = useState(true);

    // HANDLE THE FETCH
    const handleFetch = (e) => {
        // Prevent Reload
        e.preventDefault();
        // SetLoading to true
        setIsLoading(true);
        setSearchQuery(foodText);
        setInitialPage(false);
        fetch(
            `https://api.spoonacular.com/food/wine/pairing?apiKey=9f9874c4519949798c78d38210fba603&food=${foodText}`
        )
            .then((respose) => respose.json())
            .then((respose) => {
                // With the data from the respones fill the elements. u could also store it
                setDataForElements(respose);
                // Stop loading
                setIsLoading(false);
            });
    };

    // Function to set the data for Paired wines and Product Matches
    const setDataForElements = (data) => {
        console.log(data);
        if (data.status === "failure" || data.pairingText === "") {
            setPairedWines([`Not good pair found for ${foodText}`]);
            setProductMatches([noMatchObj]);
        } else {
            if (data.pairedWines.length === 0) {
                setPairedWines([`${data.pairingText}`]);
                console.log("Food is good but not good matches");
            } else {
                setPairedWines(data.pairedWines);
                setProductMatches(data.productMatches);
            }
        }
    };

    // Variable to display the elements on screen. Build the elements with the data collected
    const displayResults = (
        <div className="overall-search-result-wrapper">
            {initialPage ? (
                ""
            ) : (
                <div>
                    <ResultsBox
                        pairedWines={pairedWines}
                        searchQuery={searchQuery}
                    />
                    <RecomendationsBox matches={productMatches} />
                </div>
            )}
        </div>
    );
    // onSubmit={handleFetch}
    return (
        <div className="overall-wrapper">
            <form className="search-bar-container" onSubmit={handleFetch}>
                <input
                    id="food"
                    name="food"
                    type="text"
                    onChange={(event) => setFoodText(event.target.value)}
                    value={foodText}
                    placeholder={"Example: Salmon, Steak, Apple"}
                    autoComplete="off"
                />

                <div className="btn-container">
                    <button
                        disabled={isLoading}
                        className="btn cta-btn"
                        type="submit"
                    >
                        Search
                    </button>
                    <button className="btn more-btn">More Examples</button>
                </div>
            </form>

            <div className="search-results-container">
                {isLoading ? "LOADING" : displayResults}
            </div>
        </div>
    );
}
