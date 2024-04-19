import React, {useEffect, useState} from "react";
import "../StyleSheets/Results.css";
import { useParams } from 'react-router-dom';
import {db, dbRef} from '../fireBaseConfig/OAuth'
import {get, child} from "firebase/database";


function Results() {
    let {restaurant} = useParams();
    //let path = ref(db, `Restaurants/${restaurant}`);
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
            })
        }
        getData();
        setLoading(false);
    }, );
    if (loading) {
        console.log("loading");
        return (<div>Loading...</div>);
    }
    else {
        return (
        <div>
            {console.log("not loading")}
            <h1>{restName}</h1>
            <p>Address: {restAddress}</p>
            <p>Sunday: {restHourSunday}</p>
            <p>Monday: {restHourMonday}</p>
            <p>Tuesday: {restHourTuesday}</p>
            <p>Wednesday: {restHourWednesday}</p>
            <p>Thursday: {restHourThursday}</p>
            <p>Friday: {restHourFriday}</p>
            <p>Saturday: {restHourSaturday}</p>
        </div>
        );
    }
};

export default Results;
