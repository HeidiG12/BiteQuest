import React from "react";
import './Tags.css';
import {checkingTagsSelected} from '../../tags';

// Component for handling tag selection and submission
const Style = () => {
    // State variables for tag selection and display toggles
    const [allchecked, setAllChecked] = React.useState([]);
    const [isOpenedFlavors, setIsOpenedFlavors] = React.useState(false);
    const [isOpenedCuisine, setIsOpenedCuisine] = React.useState(false);
    const [isOpenedRestrict, setIsOpenedRestrict] = React.useState(false);
    const [restClicked, setRestClicked] = React.useState('');

    // Function to handle checkbox changes
    function handleChange(e) {
        if (e.target.checked) {
        setAllChecked([...allchecked, e.target.value]);
        } 
        else {
        setAllChecked(allchecked.filter((item) => item !== e.target.value));
        }
    }

    // Functions to toggle tag category displays
    function displayFlavors() {
        setIsOpenedFlavors(wasOpened => !wasOpened);
    }

    function displayCuisine() {
        setIsOpenedCuisine(wasOpened => !wasOpened);
    }

    function displayRestrict() {
        setIsOpenedRestrict(wasOpened => !wasOpened);
    }

    // State variable for storing search results
    const [results, setResults] = React.useState([]);

    // Function to handle tag submission
    async function submitClicked() {
        setResults([]);
        var tagsResults = Array.from(await checkingTagsSelected(allchecked));
        console.log("tagresults: " , tagsResults);
        setResults(tagsResults);
        console.log("results: ");
        results.map(item2 => (
            console.log(item2)
        ));
    }

    // JSX structure for tag selection and results display
    return (
        <div className="mainStyle">
                <h1>Search by Tags</h1>
        
                <div id="selectedDiv" className="selectedDiv">
                    {allchecked.map(item => (
                        <label>{item}</label>
                    ))}
                </div>
                <br></br>
    
                <div className="TagButtons">
                    <input type="checkbox" id="flavorLabel" onChange={displayFlavors}></input>
                    <label className="flavorLabel" htmlFor="flavorLabel" value="Flavors">Flavors</label>
                    <input type="checkbox" id="cuisineLabel" onChange={displayCuisine}></input>
                    <label className="cuisineLabel" htmlFor="cuisineLabel" value="Cuisine">Cuisine</label>
                    <input type="checkbox" id="restrictLabel" onChange={displayRestrict}></input>
                    <label className="restrictLabel" htmlFor="restrictLabel" value="Restrict">Dietary Restrictions</label>
                </div>
    
                <div className="review"> 
                    <div className="flavorsDiv" id ="flavorsDiv" style={{ display: isOpenedFlavors ? 'block' : 'none' }}>
                        <input className="flavorLabel" type = "checkbox" onChange = {handleChange} id="Spicy" name = "boxes" value="Spicy"></input>
                        <label className="flavorLabel" htmlFor="Spicy"> Spicy </label> 
                        <input type = "checkbox" onChange = {handleChange} id="Sweet" name = "boxes" value="Sweet"></input>
                        <label className="flavorLabel" htmlFor="Sweet"> Sweet </label>
                        <input type = "checkbox" onChange = {handleChange} id="Sour" name = "boxes" value="Sour"></input> 
                        <label className="flavorLabel" htmlFor="Sour"> Sour </label>
                        <br></br>
                    </div>
                    <div className="cuisineDiv" id ="cuisineDiv" style={{ display: isOpenedCuisine ? "block" : "none" }}>
                        <input type = "checkbox" onChange = {handleChange} id="Korean" name = "boxes" value="Korean"></input>
                        <label className="cuisineLabel" htmlFor ="Korean"> Korean </label>  
                        <input type = "checkbox" onChange = {handleChange} id="Indian" name = "boxes" value="Indian"></input>
                        <label className="cuisineLabel" htmlFor ="Indian"> Indian </label>
                        <input type = "checkbox" onChange = {handleChange} id="Country" name = "boxes" value="Country"></input>
                        <label className="cuisineLabel" htmlFor ="Country"> Country </label><br></br>
                    </div>
                    <div id ="restrictDiv" style={{ display: isOpenedRestrict ? "block" : "none" }}>
                        <input type = "checkbox" onChange = {handleChange} id="Gluten Free" name = "boxes" value="Gluten Free"></input>
                        <label className="restrictLabel" htmlFor ="Gluten Free"> Gluten Free </label>  
                        <input type = "checkbox" onChange = {handleChange} id="Vegan" name = "boxes" value="Vegan"></input>
                        <label className="restrictLabel" htmlFor ="Vegan"> Vegan </label>
                        <input type = "checkbox" onChange = {handleChange} id="Vegetarian" name = "boxes" value="Vegetarian"></input>
                        <label className="restrictLabel" htmlFor ="Vegetarian"> Vegetarian </label><br></br>
                    </div>
                    
                    <button type="button" className="try" id="tagSubmit" onClick={submitClicked.bind(this)}>Submit</button>
                </div>
                <div className="resultsDiv" id="resultsDiv">
                    {results.map(item => (
                        <button type="button" className="results" onClick={() => setRestClicked({item})}>{item}</button>
                        
                    ))}
                    {console.log(restClicked)}
                </div>
    </div>
    );
};

export default Style;
