import React from "react";
import "../StyleSheets/Tags.css";
import {checkingTagsSelected} from "../fireBaseConfig/TagsHelp";
import { Link } from 'react-router-dom';

const Tags = () => {
    const [allchecked, setAllChecked] = React.useState([]);
    const [isOpenedFlavors, setIsOpenedFlavors] = React.useState(false);
    const [isOpenedCuisine, setIsOpenedCuisine] = React.useState(false);
    const [isOpenedRestrict, setIsOpenedRestrict] = React.useState(false);
    const restrictions = ["Gluten Free", "Vegan", "Vegetarian"];
    const cuisine = ["Korean", "Indian", "Japanese", "Chinese", "Cuban", "Caribbean", "Mediterranean", "Italian", "American"];
    const flavors = ["Spicy", "Sweet", "Umami"];
    function handleChange(e) {
        if (e.target.checked) {
        setAllChecked([...allchecked, e.target.value]);
        } 
        else {
        setAllChecked(allchecked.filter((item) => item !== e.target.value));
        }
    }
    function displayFlavors() {
        setIsOpenedFlavors(wasOpened => !wasOpened);
    }
    function displayCuisine() {
        setIsOpenedCuisine(wasOpened => !wasOpened);
    }
    function displayRestrict() {
        setIsOpenedRestrict(wasOpened => !wasOpened);
    }
    const [results, setResults] = React.useState([]);
    async function submitClicked() {
        setResults([]);
        var tagsResults = Array.from(await checkingTagsSelected(allchecked));
        console.log("tagresults: " , tagsResults);
        setResults(tagsResults);
        results.map(item2 => (
            console.log(item2)
        ));
    }
    return (
        <div className="mainStyle">
                <h1>Search by Tags</h1>
        
                <div id="selectedDiv" className="selectedDiv">
                    {allchecked.map(item => (
                        <label className="selectedLabels">{item}</label>
                    ))}
                </div>
                <br></br>
    
                <div className="TagButtons">
                    <input type="checkbox" id="flavorLabel" onChange={displayFlavors}></input>
                    <label className="flavorLabel" htmlFor="flavorLabel" value="Flavors">Flavors</label>
                    <input type="checkbox" id="restrictLabel" onChange={displayRestrict}></input>
                    <label className="restrictLabel" htmlFor="restrictLabel" value="Restrict">Dietary Restrictions</label>
                    <input type="checkbox" id="cuisineLabel" onChange={displayCuisine}></input>
                    <label className="cuisineLabel" htmlFor="cuisineLabel" value="Cuisine">Cuisine</label>
                </div>
    
                <div className="review"> 
                    <div className="flavorsDiv" id ="flavorsDiv" style={{ display: isOpenedFlavors ? 'block' : 'none' }}>
                        {flavors.map(itemLabel => (
                            <label>
                            <input className="flavorLabel" type = "checkbox" onChange = {handleChange} id={itemLabel} name = "boxes" value={itemLabel}></input>
                            <label className="flavorLabel" htmlFor={itemLabel}> {itemLabel} </label>
                            </label>
                        ))}
                        <br></br>
                    </div>
                    <div id ="restrictDiv" style={{ display: isOpenedRestrict ? "block" : "none" }}>
                        {restrictions.map(itemLabel => (
                            <label>
                            <input type = "checkbox" onChange = {handleChange} id={itemLabel} name = "boxes" value={itemLabel}></input>
                            <label className="restrictLabel" htmlFor ={itemLabel}> {itemLabel} </label> 
                            </label>
                        ))}
                        <br></br>
                    </div>
                    <div className="cuisineDiv" id ="cuisineDiv" style={{ display: isOpenedCuisine ? "block" : "none" }}>
                        {cuisine.map(itemLabel => (
                            <label>
                            <input type = "checkbox" onChange = {handleChange} id={itemLabel} name = "boxes" value={itemLabel}></input>
                            <label className="cuisineLabel" htmlFor ={itemLabel}> {itemLabel} </label> 
                            </label>
                        ))}
                        <br></br>
                    </div>
                    
                    <button type="button" className="try" id="tagSubmit" onClick={submitClicked.bind(this)}>Submit</button>
                </div>
                <div className="resultsDiv" id="resultsDiv">
                    {results.map(item => (
                        <Link style={{ textDecoration: 'none', color: "black"}} to={`/results/${item}`} id={item} className="results">{item}</Link>
                        
                    ))}
                </div>
    </div>
    );
};

export default Tags;