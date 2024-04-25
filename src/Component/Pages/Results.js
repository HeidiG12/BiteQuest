import React, {useEffect, useState} from "react";
import "../StyleSheets/Results.css";
import { useParams } from 'react-router-dom';
import {db, dbRef} from '../fireBaseConfig/OAuth'
import {get, child, query, limitToLast, ref} from "firebase/database";
import "../StyleSheets/Results.css";

function Results() {
    //Set and create variables
    let {restaurant} = useParams();
    const [restName, setRestName] = useState('');
    const [restAddress, setAddress] = useState('');
    const [restHourSunday, setRestHourSun] = useState('');
    const [restHourMonday , setRestHourMon] = useState('');
    const [restHourTuesday, setRestHourTues] = useState('');
    const [restHourWednesday, setRestHourWed] = useState('');
    const [restHourThursday, setRestHourThurs] = useState('');
    const [restHourFriday, setRestHourFri] = useState('');
    const [restHourSaturday, setRestHourSat] = useState('');
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(false);
    const [entries, setEntries] = useState([]);
    const [date, setDate] = useState([]);
    const [profilename, setProfileName] = useState([]);
    const [founder, setFounder] = useState("BiteQuest");

    async function getEntries() {
        //initialize arrays
        var postArr = [];
        var keysArr = [];
        var userArr = [];
        var dateArr = [];
        var profileArr = [];
        var founderID = "";
        let iter = 0;

        // Query to get the latest 5 posts from the specified restaurant
        const que = query(ref(db, `Restaurants/${restaurant}/post`), limitToLast(5));
        await get(que).then((snapshot)=> {
            snapshot.forEach(childSnapshot => {
              keysArr.push(childSnapshot.key);
              postArr.push(childSnapshot.val());
            });
        });

        // Retrieve additional data based on the post keys
        for (const key of keysArr) {
            await get(child(dbRef, `Reviews/${key}`)).then((snapshot)=> {
              userArr.push(snapshot.val());
            });
            await get(child(dbRef, `usersData/${userArr[iter]}/entriestime/${keysArr[iter]}`)).then((snapshot)=> {
              dateArr.push(snapshot.val());
            });
            iter += 1;
        }

        // Retrieve profile names
        for (const user of userArr) {
            await get(child(dbRef, `usersData/${user}/profilename`)).then((snapshot)=> {
                profileArr.push(snapshot.val());
              });
        }

        // Retrieve founder information
        await get(child(dbRef, `Restaurants/${restaurant}/founder`)).then((snapshot)=> {
            if(snapshot.exists()) {
                founderID = snapshot.val();
            }
        });

        if (founderID !== "") {
            await get(child(dbRef, `usersData/${founderID}/profilename`)).then((snapshot)=> {
                if(snapshot.exists()) {
                    setFounder(snapshot.val());
                }
            });
        }

        setEntries(postArr.reverse());
        setDate(dateArr.reverse());
        setProfileName(profileArr.reverse());
        setPost(true);
    }

    // Effect to fetch restaurant data on component mount
    useEffect(() => {
        async function getData() {
            await get(child(dbRef, `Restaurants/${restaurant}`)).then((snapshot)=> {
                if(snapshot.exists()) {
                    // Set restaurant information based on snapshot
                    setRestName(snapshot.val().name);
                    setAddress(snapshot.val().address);
                    setRestHourSun(snapshot.val().hours.sunday);
                    setRestHourMon(snapshot.val().hours.monday);
                    setRestHourTues(snapshot.val().hours.tuesday);
                    setRestHourWed(snapshot.val().hours.wednesday);
                    setRestHourThurs(snapshot.val().hours.thursday);
                    setRestHourFri(snapshot.val().hours.friday);
                    setRestHourSat(snapshot.val().hours.saturday);
                }
            });
        }

        getData();
        setLoading(false);
    }, );

    // Show loading message if data is not yet fetched
    if (loading) {
        return (<div>Loading...</div>);
    }

    // If posts are not yet loaded
    if (!post) {
        getEntries();
    }
    else {
        // Render the main component content
        return (
        <div>
            <h1>{restName}</h1>
            <p>Address: {restAddress}</p>
            <p>Sunday: {restHourSunday}</p>
            <p>Monday: {restHourMonday}</p>
            <p>Tuesday: {restHourTuesday}</p>
            <p>Wednesday: {restHourWednesday}</p>
            <p>Thursday: {restHourThursday}</p>
            <p>Friday: {restHourFriday}</p>
            <p>Saturday: {restHourSaturday}</p>

            {entries.length === 0 ? (
                <div>
                    <h2 className="sectionTitle">No reviews yet</h2>
                </div>   
            )
            :
            post ? 
            (
            <div>
                <h2 className="sectionTitle">Reviews</h2>
                {(Array.from(entries)).map((entry, index) => ( 
                <div>
                <div className="baseResults">
                    <div className="lineResults">
                        <label className="nameResults">{profilename[index]}</label>
                        <label className="dateResults">{date[index]}</label>
                    </div>
                    <br></br><br></br>
                    <label>{entry}</label><br></br>
                </div>
                <br></br>
                </div>
                ))
                }
            </div>
            )
            : (<div></div>)
            }
            <br></br>
            <label className="founder">Founder: {founder}</label>
            <br></br><br></br>
        </div>
        );
    }
};

// Export Results component for use in routing and other contexts
export default Results;
