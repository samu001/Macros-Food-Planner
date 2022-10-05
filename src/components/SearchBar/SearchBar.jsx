import { useState } from "react";
import "./SearchBar.css";
import RecomendationsBox from "../Recomendations/RecomendationsBox";
import ResultsBox from "../ResultsBox/ResultsBox";
import SliderEl from "../UI/SliderEl";
import Modal from "../UI/Modal";
import useModal from "../UI/useModal";
import BeatLoader from "react-spinners/BeatLoader";

export default function SearchBar() {
    const API_KEY = "02c37ccd9f844734a5aa07d4f0e5ec8c";

    const [isLoading, setIsLoading] = useState(false);
    const [pairedWines, setPairedWines] = useState("");
    const [productMatches, setProductMatches] = useState([]);
    const [foodText, setFoodText] = useState("");

    const [searchQuery, setSearchQuery] = useState("");
    const [initialPage, setInitialPage] = useState(true);
    const [maxPrice, setMaxPrice] = useState(25);

    // Custom Hook for modal
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
            `https://api.spoonacular.com/food/wine/pairing?apiKey=${API_KEY}&food=${foodText}&maxPrice=${maxPrice}`
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
                    // setLimitReached(true);
                }
            });
    };

    // Function to set the data for Paired wines and Product Matches
    const setDataForElements = (data) => {
        //If search fails or no good match
        console.log(data);

        if (
            data.status === "failure" ||
            (pairedWines.length === undefined && data.pairingText === "")
        ) {
            setPairedWines({
                winesArr: [
                    `Not good pair found for ${foodText}. Please enter a different food`,
                ],
            });

            setProductMatches([]);
        } else {
            setPairedWines({
                winesArr: data.pairedWines,
                pairText: data.pairingText,
            });
            setProductMatches(data.productMatches);
        }
    };

    function displayData() {
        if (!initialPage) {
            if (isLoading) {
                return <BeatLoader color={"#5E548E"} />;
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
                <p>{`Product Max Price $${maxPrice}`}</p>
                {/* handleChange prop calls a function that updates the state of max price with the value passed from the child */}
                <SliderEl
                    handleChange={(e) => {
                        setMaxPrice(e.target.value);
                    }}
                />
            </div>

            {displayData()}
        </div>
    );
}
