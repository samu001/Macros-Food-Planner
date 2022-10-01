import { useEffect, useState } from "react";
import "./SearchBar.css";

import RecomendationsBox from "../Recomendations/RecomendationsBox";
import ResultsBox from "../ResultsBox/ResultsBox";

export default function SearchBar() {
    const API_KEY = "9f9874c4519949798c78d38210fba603";
    const [mealFlag, setMealFlag] = useState(false);
    const [foodText, setFoodText] = useState("");
    const [pairedWines, setPairedWines] = useState([]);
    const [productMatches, setProductMatches] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [start, setStart] = useState(true);

    const noMatchObj = {
        imageUrl:
            "https://emojipedia-us.s3.amazonaws.com/source/noto-emoji-animations/344/pensive-face_1f614.gif",
    };

    useEffect(() => {
        getMealsData();
    }, [mealFlag]);

    // Function to get data from API
    async function getMealsData() {
        try {
            const api = await fetch(
                `https://api.spoonacular.com/food/wine/pairing?apiKey=9f9874c4519949798c78d38210fba603&food=${foodText}`
            );
            let data = await api.json();
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
        } catch (err) {
            console.log(err);
        }
    }

    // This function will change the value of the state variable, so it will trigger useEffect
    function requestFood() {
        setMealFlag((prevState) => {
            return !prevState;
        });
    }

    // Handle the submit button
    function handleSubmit(e) {
        e.preventDefault();
        setStart(false);
        setSearchQuery(foodText);
        requestFood();
    }

    return (
        <div className="overall-wrapper">
            <form className="search-bar-container" onSubmit={handleSubmit}>
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
                    <button className="btn cta-btn" type="submit">
                        Search
                    </button>
                    <button className="btn more-btn">More Examples</button>
                </div>
            </form>

            <div className="search-results-container">
                {start === true ? (
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
        </div>
    );
}
