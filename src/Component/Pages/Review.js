import React, {useState } from "react";
import "../StyleSheets/Review.css";
import { get, set, child, ref, push, update} from "firebase/database";
import {db, dbRef, auth} from '../fireBaseConfig/OAuth';
import { Timestamp } from "firebase/firestore";

const Review = () => {
    const [allchecked, setAllChecked] = React.useState([]);
    const [isOpenedFlavors, setIsOpenedFlavors] = React.useState(false);
    const [isOpenedCuisine, setIsOpenedCuisine] = React.useState(false);
    const [isOpenedRestrict, setIsOpenedRestrict] = React.useState(false);
    const restrictions = ["Gluten Free", "Vegan", "Vegetarian"];
    const cuisine = ["Korean", "Indian", "Japanese", "Chinese", "Cuban", "Caribbean", "Mediterranean", "Italian", "American"];
    const flavors = ["Spicy", "Sweet", "Umami"];

    // Handle checkbox changes for tag selection
    function handleChange(e) {
        if (e.target.checked) {
        setAllChecked([...allchecked, e.target.value]);
        } 
        else {
        setAllChecked(allchecked.filter((item) => item !== e.target.value));
        }
    }

    // Toggle display for flavors, cuisine, and restrictions
    function displayFlavors() {
        setIsOpenedFlavors(wasOpened => !wasOpened);
    }

    function displayCuisine() {
        setIsOpenedCuisine(wasOpened => !wasOpened);
    }

    function displayRestrict() {
        setIsOpenedRestrict(wasOpened => !wasOpened);
    }

    // Reset the form states to their defaults
    function reset() {
        setAllChecked([]);
        setIsOpenedFlavors(false);
        setIsOpenedCuisine(false);
        setIsOpenedRestrict(false);
    }

    //initialize all variables
    const [description , setDescription] = useState("");
    const [restaurantInput, setRestInput] = useState("");
    const [submitted, setSubmitted] = useState(false)
    const [restDNE, setRestDNE] = useState(false);
    const [submitNew, setSubmitNew] = useState(false);
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

    // Handle form submission to submit a review
    async function handleSubmit(event) {
        event.preventDefault();
        reset();
        setSubmitted(true);
        const updates = {};

        //for write description 
        await get(child(dbRef, `Restaurants/${restaurantInput.toUpperCase()}`)).then((snapshot)=>{
            console.log(restaurantInput);
            if (snapshot.exists()) {
                get(child(dbRef, `Restaurants/${restaurantInput.toUpperCase()}/post`)).then((snapshot)=>{
                    const newPostKey = push(child(dbRef, `Reviews`)).key;
                    updates[`Restaurants/${restaurantInput.toUpperCase()}/post/${newPostKey}`] = description;

                    //Updates review on usersData folder in database 
                    updates[`usersData/${auth.currentUser.uid}/entries/${newPostKey}`] = restaurantInput.toUpperCase();
                    updates[`usersData/${auth.currentUser.uid}/entriespost/${newPostKey}`] = description;
                    updates[`usersData/${auth.currentUser.uid}/profilename`] = auth.currentUser.displayName;
                    updates[`Reviews/${newPostKey}`] = auth.currentUser.uid;
                    
                    //Add timestamp for Date 
                    const time = Timestamp.now();
                    console.log(`Date: ${time.toDate().toLocaleDateString()}`);
                    updates[`usersData/${auth.currentUser.uid}/entriestime/${newPostKey}`] = time.toDate().toLocaleDateString();
                    
                    update(dbRef, updates);
                });

                // Update tag counts based on user selection
                allchecked.forEach((tag) => {
                    const tagUpdates = {};
                    get(child(dbRef, `Tags/${tag.toUpperCase()}/${restaurantInput.toUpperCase()}`)).then((snapshot)=>{
                        if (snapshot.exists()) {
                            var num = snapshot.val();
                            console.log(tag + ": " + num);
                            num += 1;
                            tagUpdates[`Tags/${tag.toUpperCase()}/${restaurantInput.toUpperCase()}`] = num;
                            update(dbRef, tagUpdates);
                        }
                        else {
                            console.log(tag + " tag does not have restaurant so set default = 1");
                            tagUpdates[`Tags/${tag.toUpperCase()}/${restaurantInput.toUpperCase()}`] = 1;
                            update(dbRef, tagUpdates);
                        } 
                    });
                });
            }
            else {
                console.log("Invalid: No data available");
                setRestDNE(true);
                setSubmitted(false); 
            }
        });
        setAllChecked([]);
    }

    // Handle the submission of a new restaurant if it doesn't exist
    function handleNewRestSub(e) {
        setSubmitNew(true);
        setRestDNE(false);
    }

    // Handle form submission for a new restaurant
    function handleNewRestSubForm(event) {
        event.preventDefault();
        console.log("Monday: " + submitNewMonStart + submitNewMonStartSuf + " - " + submitNewMonEnd + submitNewMonEndSuf);
        console.log("Tuesday: " + submitNewTuesStart + submitNewTuesStartSuf + " - " + submitNewTuesEnd + submitNewTuesEndSuf);
        console.log("Wednesday: " + submitNewWedStart + submitNewWedStartSuf + " - " + submitNewWedEnd + submitNewWedEndSuf);
        console.log("Thursday: " + submitNewThursStart + submitNewThursStartSuf + " - " + submitNewThursEnd + submitNewThursEndSuf);
        console.log("Friday: " + submitNewFriStart + submitNewFriStartSuf + " - " + submitNewFriEnd + submitNewFriEndSuf);
        console.log("Saturday: " + submitNewSatStart + submitNewSatStartSuf + " - " + submitNewSatEnd + submitNewSatEndSuf);
        console.log("Sunday: " + submitNewSunStart + submitNewSunStartSuf + " - " + submitNewSunEnd + submitNewSunEndSuf);

        // Set new restaurant data in Firebase
        set(ref(db, `Restaurants/${submitNewName.toUpperCase()}`), {
            name: submitNewName,
            address: submitNewAddress,
            founder: auth.currentUser.uid,
        });
        set(ref(db, `Restaurants/${submitNewName.toUpperCase()}/hours`), {
            monday: `${submitNewMonStart+submitNewMonStartSuf}-${submitNewMonEnd+submitNewMonEndSuf}`,
            tuesday: `${submitNewTuesStart+submitNewTuesStartSuf}-${submitNewTuesEnd+submitNewTuesEndSuf}`,
            wednesday: `${submitNewWedStart+submitNewWedStartSuf}-${submitNewWedEnd+submitNewWedEndSuf}`,
            thursday: `${submitNewThursStart+submitNewThursStartSuf}-${submitNewThursEnd+submitNewThursEndSuf}`,
            friday: `${submitNewFriStart+submitNewFriStartSuf}-${submitNewFriEnd+submitNewFriEndSuf}`,
            saturday: `${submitNewSatStart+submitNewMonStartSuf}-${submitNewMonEnd+submitNewSatEndSuf}`,
            sunday: `${submitNewSunStart+submitNewSunStartSuf}-${submitNewSunEnd+submitNewSunEndSuf}`,
        });
        setSubmitNew(false);
    }

    function makeAnother() {
        setSubmitted(false);
    }

    function goBack() {
        setRestDNE(false);
    }

    //rendering UI screen based on requests from buttons pressed
    return (
        <div>
        {submitted ? 
        (<form className="reviewForm"> 
            <div className="formDiv"> 
            <p>Thanks for submitting a review</p> 
            <p>Continue to embark on your BiteQuest</p>
            <button className="reviewSubmit" onClick={makeAnother.bind(this)}>Make another review</button>
            </div>
        </form>) 
        : restDNE ? 
        (<form className="reviewForm"> 
            <div className="formDiv"> 
            <p>The restuarant entered does not exist in the database</p> 
            <p>Verify the restaurant name entered is correct or submit a new restaurant request</p>
            <button className="buttons1" onClick={goBack.bind(this)}>Back</button>
            <button className="buttons1" onClick={handleNewRestSub.bind(this)}>Submit a new restaurant</button>
            </div>
        </form>
        ) 

        //for submitting a new request, having to put in name, hours of op, and address
        :submitNew ? 
        (<form onSubmit={handleNewRestSubForm} className="reviewForm"> 
            <div className="formDiv"> 
            <p>Submit a new restaurant</p> 
            <label className="restaurantName">
                Name: <input required className="restInputNew" onChange={(e) => setSubmitNewName(e.target.value)}/> 
            </label> 
            <br></br>
            <label className="restaurantAddress">
                Address: <input required className="addressInput" onChange={(e) => setSubmitNewAddress(e.target.value)}/> 
            </label>
            <br></br>
            <label className="hours">
                -Operation Hours-
            </label>
            <br></br>
            <label className="hours">
                Monday: <input required className="hoursInput" onChange={(e) => setSubmitNewMonStart(e.target.value)}/>
            </label>
            <select value={submitNewMonStartSuf} onChange={(e) => setSubmitNewMonStartSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <label className="hours">
                -<input required className="hoursInput" onChange={(e) => setSubmitNewMonEnd(e.target.value)}/>
            </label>
            <select value={submitNewMonEndSuf} onChange={(e) => setSubmitNewMonEndSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select> <br></br>
            <label className="hours">
                Tuesday: <input required className="hoursInput" onChange={(e) => setSubmitNewTuesStart(e.target.value)}/>
            </label>
            <select value={submitNewTuesStartSuf} onChange={(e) => setSubmitNewTuesStartSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <label className="hours">
                -<input required className="hoursInput" onChange={(e) => setSubmitNewTuesEnd(e.target.value)}/>
            </label>
            <select value={submitNewTuesEndSuf} onChange={(e) => setSubmitNewTuesEndSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select> <br></br>
            <label className="hours">
                Wednesday: <input required className="hoursInput" onChange={(e) => setSubmitNewWedStart(e.target.value)}/>
            </label>
            <select value={submitNewWedStartSuf} onChange={(e) => setSubmitNewWedStartSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <label className="hours">
                -<input required className="hoursInput" onChange={(e) => setSubmitNewWedEnd(e.target.value)}/>
            </label>
            <select value={submitNewWedEndSuf} onChange={(e) => setSubmitNewWedEndSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select> <br></br>
            <label className="hours">
                Thursday: <input required className="hoursInput" onChange={(e) => setSubmitNewThursStart(e.target.value)}/>
            </label>
            <select value={submitNewThursStartSuf} onChange={(e) => setSubmitNewThursStartSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <label className="hours">
                -<input required className="hoursInput" onChange={(e) => setSubmitNewThursEnd(e.target.value)}/>
            </label>
            <select value={submitNewThursEndSuf} onChange={(e) => setSubmitNewThursEndSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select> <br></br>
            <label className="hours">
                Friday: <input required className="hoursInput" onChange={(e) => setSubmitNewFriStart(e.target.value)}/>
            </label>
            <select value={submitNewFriStartSuf} onChange={(e) => setSubmitNewFriStartSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <label className="hours">
                -<input required className="hoursInput" onChange={(e) => setSubmitNewFriEnd(e.target.value)}/>
            </label>
            <select value={submitNewFriEndSuf} onChange={(e) => setSubmitNewFriEndSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select> <br></br>
            <label className="hours">
                Saturday: <input required className="hoursInput" onChange={(e) => setSubmitNewSatStart(e.target.value)}/>
            </label>
            <select value={submitNewSatStartSuf} onChange={(e) => setSubmitNewSatStartSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <label className="hours">
                -<input required className="hoursInput" onChange={(e) => setSubmitNewSatEnd(e.target.value)}/>
            </label>
            <select value={submitNewSatEndSuf} onChange={(e) => setSubmitNewSatEndSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select> <br></br>
            <label className="hours">
                Sunday: <input required className="hoursInput" onChange={(e) => setSubmitNewSunStart(e.target.value)}/>
            </label>
            <select value={submitNewSunStartSuf} onChange={(e) => setSubmitNewSunStartSuf(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <label className="hours">
                -<input required className="hoursInput" onChange={(e) => setSubmitNewSunEnd(e.target.value)}/>
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
                        Restaurant Name: <input required className="restInput" onChange={(e) => setRestInput(e.target.value)}/>
                    </label>
                    <br></br><br></br>
                    <label className="descriptionLabel"> 
                        Describe your experience: 
                        <textarea required className="description"
                            placeholder="How was your experience?"
                            name="postContent"
                            rows={10}
                            cols={80}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                </div>
                <br></br>
                <label>Select some tags</label>
                <div id="selectedReviewDiv" className="selectedReviewDiv">
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

                </div>
                <button type="submit" className="reviewSubmit" value="submit">Submit</button>
            </div>
        </form>
        )};
        </div>
    );

};
// Export the Review component
export default Review;