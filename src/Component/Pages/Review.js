import React, {useState } from "react";
import "../StyleSheets/Review.css";
import { get, set, child, ref, onValue, push, update} from "firebase/database";
import {db, dbRef} from '../fireBaseConfig/OAuth'


/*const [restaurantToReview, setRestaurantToReview] = React.useState([]);
const [restaurantToReviewbool, setRestaurantToReviewbool] = React.useState(true);
async function GetRestaurants() {
    //const rest = get(child(dbRef, "Tags/"));
    //console.log(rest[0]);
    await get(child(dbRef, "Tags")).then((snapshot) => {
        snapshot.forEach(child => {    
            //console.log(child.key);
            restaurantToReview.push(child.key);
            //console.log(restaurantToReview);
            //setRestaurantToReview([restaurantToReview])
        });
    });
    //setRestaurantToReview([restaurantToReview])
    setRestaurantToReviewbool(false);
    setRestaurantToReview(restaurantToReview);
}
if (restaurantToReviewbool) {
    GetRestaurants();
    console.log(restaurantToReview);
}
*/

const Review = () => {
    const [allchecked, setAllChecked] = React.useState([]);
    const [isOpenedFlavors, setIsOpenedFlavors] = React.useState(false);
    const [isOpenedCuisine, setIsOpenedCuisine] = React.useState(false);
    const [isOpenedRestrict, setIsOpenedRestrict] = React.useState(false);
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

    const [description , setDescription] = useState("");
    const [restaurantInput, setRestInput] = useState("");
    const [submitted, setSubmitted] = useState(false)
    const [restDNE, setRestDNE] = useState(false);
    const [submitNew, setSubmitNew] = useState(false);
    //for submit new rest in database 
    const [submitNewName, setSubmitNewName] = useState("");
    const [submitNewAddress, setSubmitNewAddress] = useState("");
    const [submitNewMonStart, setSubmitNewMonStart] = useState("");
    const [submitNewMonEnd, setSubmitNewMonEnd] = useState("");
    const [submitNewMonStartSuf, setSubmitNewMonStartSuf] = useState("AM");
    const [submitNewMonEndSuf, setSubmitNewMonEndSuf] = useState("AM");
    const [submitNewTuesStart, setSubmitNewTuesStart] = useState("");
    const [submitNewTuesEnd, setSubmitNewTuesEnd] = useState("");
    const [submitNewTuesStartSuf, setSubmitNewTuesStartSuf] = useState("AM");
    const [submitNewTuesEndSuf, setSubmitNewTuesEndSuf] = useState("AM");
    const [submitNewWedStart, setSubmitNewWedStart] = useState("");
    const [submitNewWedEnd, setSubmitNewWedEnd] = useState("");
    const [submitNewWedStartSuf, setSubmitNewWedStartSuf] = useState("AM");
    const [submitNewWedEndSuf, setSubmitNewWedEndSuf] = useState("AM");
    const [submitNewThursStart, setSubmitNewThursStart] = useState("");
    const [submitNewThursEnd, setSubmitNewThursEnd] = useState("");
    const [submitNewThursStartSuf, setSubmitNewThursStartSuf] = useState("AM");
    const [submitNewThursEndSuf, setSubmitNewThursEndSuf] = useState("AM");
    const [submitNewFriStart, setSubmitNewFriStart] = useState("");
    const [submitNewFriEnd, setSubmitNewFriEnd] = useState("");
    const [submitNewFriStartSuf, setSubmitNewFriStartSuf] = useState("AM");
    const [submitNewFriEndSuf, setSubmitNewFriEndSuf] = useState("AM");
    const [submitNewSatStart, setSubmitNewSatStart] = useState("");
    const [submitNewSatEnd, setSubmitNewSatEnd] = useState("");
    const [submitNewSatStartSuf, setSubmitNewSatStartSuf] = useState("AM");
    const [submitNewSatEndSuf, setSubmitNewSatEndSuf] = useState("AM"); 
    const [submitNewSunStart, setSubmitNewSunStart] = useState("");
    const [submitNewSunEnd, setSubmitNewSunEnd] = useState("");
    const [submitNewSunStartSuf, setSubmitNewSunStartSuf] = useState("AM");
    const [submitNewSunEndSuf, setSubmitNewSunEndSuf] = useState("AM");

    //updates the tags
    async function handleSubmit(event) {
        event.preventDefault();
        setSubmitted(true);
        const updates = {};
        //for write description 
        await get(child(dbRef, `Restaurants/${restaurantInput.toUpperCase()}`)).then((snapshot)=>{
            console.log(restaurantInput);
            if (snapshot.exists()) {
                const newPostKey = push(child(dbRef, `Restaurants/${restaurantInput.toUpperCase()}/post`)).key;
                var path = ref(db, `Restaurants/${restaurantInput.toUpperCase()}/post`);
                onValue(path, (snapshot)=> {
                if (snapshot.exists()) {
                    if (description !== "") {
                        updates[`Restaurants/${restaurantInput.toUpperCase()}/post/${newPostKey}`] = description;
                    }
                    //Also later update it for user posts 
                }
                else {
                    console.log("post folder not created");
                    /*set(ref(db, `Restaurants/${restaurantInput.toUpperCase()}/post`), {
                    one: description, 
                    //username: name,
                    //profile_picture : 
                    });*/
                }
                });
            }
            else {
                console.log("Invalid: No data available");
                setRestDNE(true);
                setSubmitted(false); 
            }
        });
        //Updates the tags 
        allchecked.forEach((tag) => {
            var path = ref(db, `Tags/${tag.toUpperCase()}/${restaurantInput.toUpperCase()}`);
            onValue(path, (snapshot)=> {
                if (snapshot.exists()) {
                    var num = snapshot.val();
                    console.log(tag + ": " + num);
                    num += 1;
                    updates[`Tags/${tag.toUpperCase()}/${restaurantInput.toUpperCase()}`] = num;
                }
                else {
                    console.log(tag + " tag does not have restaurant so set default = 1");
                    set(ref(db, `Tags/${tag.toUpperCase()}/${restaurantInput.toUpperCase()}`), {
                    });
                    updates[`Tags/${tag.toUpperCase()}/${restaurantInput.toUpperCase()}`] = 1;
                } 
            });
        });
        update(dbRef, updates);
        setAllChecked([]);
    }
    function handleNewRestSub(e) {
        setSubmitNew(true);
        setRestDNE(false);
    }
    function handleNewRestSubForm(event) {
        event.preventDefault();
        //setSubmitNew(true);
        console.log("Monday: " + submitNewMonStart + submitNewMonStartSuf + " - " + submitNewMonEnd + submitNewMonEndSuf);
        console.log("Tuesday: " + submitNewTuesStart + submitNewTuesStartSuf + " - " + submitNewTuesEnd + submitNewTuesEndSuf);
        console.log("Wednesday: " + submitNewWedStart + submitNewWedStartSuf + " - " + submitNewWedEnd + submitNewWedEndSuf);
        console.log("Thursday: " + submitNewThursStart + submitNewThursStartSuf + " - " + submitNewThursEnd + submitNewThursEndSuf);
        console.log("Friday: " + submitNewFriStart + submitNewFriStartSuf + " - " + submitNewFriEnd + submitNewFriEndSuf);
        console.log("Saturday: " + submitNewSatStart + submitNewSatStartSuf + " - " + submitNewSatEnd + submitNewSatEndSuf);
        console.log("Sunday: " + submitNewSunStart + submitNewSunStartSuf + " - " + submitNewSunEnd + submitNewSunEndSuf);
        set(ref(db, `Restaurants/${restaurantInput.toUpperCase()}`), {
            name: submitNewName,
            address: submitNewAddress,
        });
        set(ref(db, `Restaurants/${restaurantInput.toUpperCase()}/hours`), {
            monday: `${submitNewMonStart+submitNewMonStartSuf}-${submitNewMonEnd+submitNewMonEndSuf}`,
        });
    }
    return (
        <div>
        {console.log("Status: " + submitNew)}
        {submitted ? 
        (<form className="reviewForm"> 
            <div className="formDiv"> 
            <p>Thanks for submitting a review</p> 
            <p>Continue to embark on your BiteQuest</p>
            </div>
        </form>) 
        : restDNE ? 
        (<form className="reviewForm"> 
            <div className="formDiv"> 
            <p>The restuarant entered does not exist in the database</p> 
            <p>Verify the restaurant name entered is correct or submit a new restaurant request</p>
            <button className="reviewSubmit" onClick={handleNewRestSub.bind(this)}>Submit a new restaurant</button>
            </div>
        </form>
        ) 
        :submitNew ? 
        (<form onSubmit={handleNewRestSubForm} className="reviewForm"> 
            <div className="formDiv"> 
            <p>Submit a new restaurant</p> 
            <label className="restaurantName">
                Name: <input className="restInput" onChange={(e) => setSubmitNewName(e.target.value)}/> 
            </label> 
            <br></br>
            <label className="restaurantAddress">
                Address: <input className="addressInput" onChange={(e) => setSubmitNewAddress(e.target.value)}/> 
            </label>
            <br></br>
            <label className="hours">
                -Operation Hours-
            </label>
            <br></br>
            <label className="hours">
                Monday: <input className="hoursInput" onChange={(e) => setSubmitNewMonStart(e.target.value)}/>
            </label>
            <select value={submitNewMonStartSuf} onChange={(e) => setSubmitNewMonStartSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <label className="hours">
                -<input className="hoursInput" onChange={(e) => setSubmitNewMonEnd(e.target.value)}/>
            </label>
            <select value={submitNewMonEndSuf} onChange={(e) => setSubmitNewMonEndSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select> <br></br>
            <label className="hours">
                Tuesday: <input className="hoursInput" onChange={(e) => setSubmitNewTuesStart(e.target.value)}/>
            </label>
            <select value={submitNewTuesStartSuf} onChange={(e) => setSubmitNewTuesStartSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <label className="hours">
                -<input className="hoursInput" onChange={(e) => setSubmitNewTuesEnd(e.target.value)}/>
            </label>
            <select value={submitNewTuesEndSuf} onChange={(e) => setSubmitNewTuesEndSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select> <br></br>
            <label className="hours">
                Wednesday: <input className="hoursInput" onChange={(e) => setSubmitNewWedStart(e.target.value)}/>
            </label>
            <select value={submitNewWedStartSuf} onChange={(e) => setSubmitNewWedStartSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <label className="hours">
                -<input className="hoursInput" onChange={(e) => setSubmitNewWedEnd(e.target.value)}/>
            </label>
            <select value={submitNewWedEndSuf} onChange={(e) => setSubmitNewWedEndSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select> <br></br>
            <label className="hours">
                Thursday: <input className="hoursInput" onChange={(e) => setSubmitNewThursStart(e.target.value)}/>
            </label>
            <select value={submitNewThursStartSuf} onChange={(e) => setSubmitNewThursStartSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <label className="hours">
                -<input className="hoursInput" onChange={(e) => setSubmitNewThursEnd(e.target.value)}/>
            </label>
            <select value={submitNewThursEndSuf} onChange={(e) => setSubmitNewThursEndSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select> <br></br>
            <label className="hours">
                Friday: <input className="hoursInput" onChange={(e) => setSubmitNewFriStart(e.target.value)}/>
            </label>
            <select value={submitNewFriStartSuf} onChange={(e) => setSubmitNewFriStartSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <label className="hours">
                -<input className="hoursInput" onChange={(e) => setSubmitNewFriEnd(e.target.value)}/>
            </label>
            <select value={submitNewFriEndSuf} onChange={(e) => setSubmitNewFriEndSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select> <br></br>
            <label className="hours">
                Saturday: <input className="hoursInput" onChange={(e) => setSubmitNewSatStart(e.target.value)}/>
            </label>
            <select value={submitNewSatStartSuf} onChange={(e) => setSubmitNewSatStartSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <label className="hours">
                -<input className="hoursInput" onChange={(e) => setSubmitNewSatEnd(e.target.value)}/>
            </label>
            <select value={submitNewSatEndSuf} onChange={(e) => setSubmitNewSatEndSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select> <br></br>
            <label className="hours">
                Sunday: <input className="hoursInput" onChange={(e) => setSubmitNewSunStart(e.target.value)}/>
            </label>
            <select value={submitNewSunStartSuf} onChange={(e) => setSubmitNewSunStartSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <label className="hours">
                -<input className="hoursInput" onChange={(e) => setSubmitNewSunEnd(e.target.value)}/>
            </label>
            <select value={submitNewSunEndSuf} onChange={(e) => setSubmitNewSunEndSuf(e.target.value)}> 
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <button type="submit" className="reviewSubmit" value="submit1">Submit</button>
            </div>
        </form>
        )
        : 
        (<form onSubmit={handleSubmit} className="reviewForm"> 
            <div className="formDiv">
                <div className="mainInfo">
                    <label className="restaurantName">
                        Pick a restaurant: <input className="restInput" onChange={(e) => setRestInput(e.target.value)}/>
                    </label>
                    <br></br><br></br>
                    <label className="descriptionLabel"> 
                        Describe your experience: 
                        <textarea className="description"
                            placeholder="How was your experience?"
                            name="postContent"
                            rows={10}
                            cols={80}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                </div>
                <br></br>
                <div id="selectedReviewDiv" className="selectedReviewDiv">
                    {allchecked.map(item => (
                        <label className="selectedLabels">{item}</label>
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

                </div>
                <button type="submit" className="reviewSubmit" value="submit">Submit</button>
            </div>
        </form>
        )};
        </div>
    );

};
export default Review;