import { useEffect, useState } from "react";
import "./SearchBar.css";
import RecomendationsBox from "../Recomendations/RecomendationsBox";
import ResultsBox from "../ResultsBox/ResultsBox";
import SliderEl from "../UI/SliderEl";
import Modal from "../UI/Modal";
import useModal from "../UI/useModal";
import { textAlign } from "@mui/system";

export default function SearchBar() {
    const API_KEY = "9f9874c4519949798c78d38210fba603";

    const noMatchObj = {
        img: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png",
    };

    const [isLoading, setIsLoading] = useState(false);
    const [pairedWines, setPairedWines] = useState("");
    const [productMatches, setProductMatches] = useState([]);
    const [foodText, setFoodText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [initialPage, setInitialPage] = useState(true);
    const [maxPrice, setMaxPrice] = useState(25);
    const [limitReached, setLimitReached] = useState(false);

    // Custom Hook
    const { isShowing, toggle } = useModal();

    // HANDLE THE FETCH
    const handleFetch = (e) => {
        // Prevent Reload
        e.preventDefault();
        // SetLoading to true
        setIsLoading(true);
        setSearchQuery(foodText);
        setInitialPage(false);
        fetch(
            `https://api.spoonacular.com/food/wine/pairing?apiKey=9f9874c4519949798c78d38210fba603&food=${foodText}&maxPrice=${maxPrice}`
        )
            .then((response) => response.json())
            .then((response) => {
                // With the data from the respones fill the elements. u could also store it
                setDataForElements(response);
                // Stop loading
                setIsLoading(false);
            })
            .then((response) => {
                if (response === undefined) {
                    // console.log("CALL LIMIT REACHED");
                    setLimitReached(true);
                }
            });
    };

    // Function to set the data for Paired wines and Product Matches
    const setDataForElements = (data) => {
        //If search fails or no good match
        if (data.status === "failure") {
            setPairedWines({
                winesArr: [
                    `Not good pair found for ${foodText} Please enter a different food`,
                ],
                pairText: "",
            });

            setProductMatches([
                {
                    title: "",
                },
            ]);
        } else {
            setPairedWines({
                winesArr: data.pairedWines,
                pairText: data.pairingText,
            });
            setProductMatches(data.productMatches);
        }
    };

    function displayData() {
        if (limitReached) {
            return (
                <div style={{ color: "#FF0000", textAlign: "center" }}>
                    API calls limit for today have been reached, thank you for
                    visiting my project site!
                </div>
            );
        } else {
            if (!initialPage) {
                if (isLoading) {
                    return "LOADING";
                } else {
                    return (
                        <div>
                            <ResultsBox
                                wineInfo={pairedWines}
                                searchQuery={searchQuery}
                            />
                            <RecomendationsBox matches={productMatches} />
                        </div>
                    );
                }
            }
        }
    }

    // Variable to display the elements on screen. Build the elements with the data collected
    const displayResults = (
        <div className="overall-search-result-wrapper">
            {initialPage ? (
                "Welcome :)"
            ) : (
                <div>
                    <ResultsBox
                        wineInfo={pairedWines}
                        searchQuery={searchQuery}
                    />
                    <RecomendationsBox matches={productMatches} />
                </div>
            )}
        </div>
    );

    return (
        <div className="overall-wrapper">
            <form className="search-bar-container" onSubmit={handleFetch}>
                <input
                    id="food"
                    name="food"
                    type="text"
                    onChange={(event) => setFoodText(event.target.value)}
                    value={foodText}
                    placeholder={"E.g: Salmon, Steak, Apple, Sushi"}
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
                    <button
                        type="button"
                        className="btn more-btn"
                        onClick={toggle}
                    >
                        More Examples
                    </button>

                    <Modal isShowing={isShowing} hide={toggle} />
                </div>
            </form>

            <div className="slider">
                <p>{`Recommendation Max Price $${maxPrice}`}</p>
                {/* handleChange prop calls a function that updates the state of max price with the value passed from the child */}
                <SliderEl
                    handleChange={(e) => {
                        setMaxPrice(e.target.value);
                    }}
                />
                {/* {limitReached && (
                    <div style={{ color: "#FF0000", textAlign: "center" }}>
                        "API calls limit for today have been reached, thank you
                        for visiting my project site!"
                    </div>
                )} */}
            </div>

            {/* {(initialPage === false )(
                <div className="search-results-container">
                    {isLoading ? "LOADING" : displayResults}
                </div>
            )} */}

            {displayData()}
        </div>
    );
}
