import { useEffect, useState } from "react";

function PopularFoods() {
    const API_KEY = "02c37ccd9f844734a5aa07d4f0e5ec8c";
    const [mealFlag, setMealFlag] = useState(false);

    //When the value of mealFlag changes, call the getMealsData function that then will call the API
    useEffect(() => {
        console.log(mealFlag);
        getMealsData();
    }, [mealFlag]);

    // You need to get 3 recipies the prot need to add up =< 170
    // so an average each recipe should have 56 g of protein

    // Calculate the macros function
    function calcMacros(cals, weight) {
        const protGrams = weight * 1;
        const fatGrams = Math.floor(weight * 0.3);
        const carbGrams = Math.floor(cals / 4);
        console.log(
            `For a diet of ${cals} calories with a weight of ${weight}lb. To gain muscle you need to eat around:
            ${protGrams}g of protein 
            ${fatGrams}g of fats
            ${carbGrams}g of carbs
            `
        );
    }

    // Function to get data from API
    async function getMealsData() {
        const api = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=pasta&maxFat=30&minFat=20&number=1`
        );
        const data = await api.json();
        console.log(data);
    }

    function requestNewMeals() {
        // This will change the value of the state variable, sp it will trigger useEffect
        setMealFlag((prevState) => {
            return !prevState;
        });
    }

    return (
        <div>
            <button onClick={() => calcMacros(2400, 144)}>
                Calculate Macros
            </button>
            <button onClick={() => requestNewMeals()}>
                Generate Daily Meal Plan
            </button>
        </div>
    );
}

export default PopularFoods;
