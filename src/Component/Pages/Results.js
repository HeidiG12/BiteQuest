import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import {db, dbRef} from '../fireBaseConfig/OAuth'
import {get, child, query, limitToLast, ref} from "firebase/database";
import "../StyleSheets/Results.css";

function Results() {
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
        var postArr = [];
        var keysArr = [];
        var userArr = [];
        var dateArr = [];
        var profileArr = [];
        var founderID = "";
        let iter = 0;
        const que = query(ref(db, `Restaurants/${restaurant}/post`), limitToLast(5));
        await get(que).then((snapshot)=> {
            snapshot.forEach(childSnapshot => {
              keysArr.push(childSnapshot.key);
              postArr.push(childSnapshot.val());
            });
        });
        for (const key of keysArr) {
            await get(child(dbRef, `Reviews/${key}`)).then((snapshot)=> {
              userArr.push(snapshot.val());
            });
            await get(child(dbRef, `users/${userArr[iter]}/entriestime/${keysArr[iter]}`)).then((snapshot)=> {
              dateArr.push(snapshot.val());
            });
            iter += 1;
        }
        for (const user of userArr) {
            await get(child(dbRef, `users/${user}/ProfileName`)).then((snapshot)=> {
                profileArr.push(snapshot.val());
              });
        }
        await get(child(dbRef, `Restaurants/${restaurant}/founder`)).then((snapshot)=> {
            if(snapshot.exists()) {
                founderID = snapshot.val();
                console.log("funder exists");
            }
        });
        if (founderID !== "") {
            console.log("fouderID is not null");
            await get(child(dbRef, `users/${founderID}/ProfileName`)).then((snapshot)=> {
                if(snapshot.exists()) {
                    setFounder(snapshot.val());
                    console.log("founder: " + snapshot.val());
                }
            });
        }
        setEntries(postArr.reverse());
        setDate(dateArr.reverse());
        setProfileName(profileArr.reverse());
        setPost(true);
    }
    useEffect(() => {
        async function getData() {
            console.log("getting Data");
            await get(child(dbRef, `Restaurants/${restaurant}`)).then((snapshot)=> {
                if(snapshot.exists()) {
                    console.log("existing right here");
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
    if (loading) {
        return (<div>Loading...</div>);
    }
    if (!post) {
        getEntries();
    }
    else {
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
                {console.log(entries)}
                {(Array.from(entries)).map((entry, index) => ( 
                <div>
                <div className="baseResults">
                    <div className="lineResults">
                        <label className="nameResults">{profilename[index]}</label>
                        <label>{date[index]}</label>
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

export default Results;
