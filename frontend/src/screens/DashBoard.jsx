import React, { useEffect, useState } from 'react'
import '../styles/dashboard.css'

function DashBoard() {

    const [data, setData] = useState([]);
    const [totalMiles, setTotalMiles] = useState(0)

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            // const result = await fetch(`http://localhost:9000/api/data/`);
            // const data2 = result.json();
            // console.log(typeof (result) === typeof (data) ? "true" : "false");
            // // setData(result)

            fetch("http://localhost:9000/api/data/").then(res => res.json()).then(result => setData(result
            )).catch();
        }

        fetchData();
    }, [])

    useEffect(() => {
        console.log(data.length);

        var milesRun = 0

        for (let i = 0; i < data.length; i++) {
            milesRun = milesRun + data[i].milesDriven;
        }

        setTotalMiles(milesRun)
    }, [data])

    const AllTimeData = () => {
        window.location.reload();
    }

    const dailyData = async () => {
        const date = new Date();

        const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

        fetch('http://localhost:9000/api/data/specificdata', {
            method: 'POST',
            body: JSON.stringify({
                gt: formattedDate,
                lt: formattedDate
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json()).then(result => setData(result
            )).catch();

    }

    const weeklyData = async () => {
        var date = new Date; // get dateent date
        var first = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        const gt = `${date.getFullYear()}/${date.getMonth() + 1}/${first}`
        const lt = `${date.getFullYear()}/${date.getMonth() + 1}/${last}`

        fetch('http://localhost:9000/api/data/specificdata', {
            method: 'POST',
            body: JSON.stringify({
                gt: gt,
                lt: lt
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json()).then(result => setData(result
            )).catch();

    }

    const monthlyData = async () => {

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const gt = `${firstDay.getFullYear()}/${firstDay.getMonth() + 1}/${firstDay.getDate()}`
        const lt = `${lastDay.getFullYear()}/${lastDay.getMonth() + 1}/${lastDay.getDate()}`
        console.log(gt, lt)
        fetch('http://localhost:9000/api/data/specificdata', {
            method: 'POST',
            body: JSON.stringify({
                gt: gt,
                lt: lt
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json()).then(result => setData(result
            )).catch();

    }

    const yearlyData = async () => {

        var date = new Date();

        const gt = `${date.getFullYear()}/1/1`
        const lt = `${date.getFullYear()}/12/31`
        console.log(gt, lt)
        fetch('http://localhost:9000/api/data/specificdata', {
            method: 'POST',
            body: JSON.stringify({
                gt: gt,
                lt: lt
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json()).then(result => setData(result
            )).catch();
    }

    const customDate = () => {
        if (from && to) {
            fetch('http://localhost:9000/api/data/specificdata', {
                method: 'POST',
                body: JSON.stringify({
                    gt: from,
                    lt: to
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then(res => res.json()).then(result => setData(result
                )).catch();
        }
        else {
            console.log("set nhi hai")
        }
    }

    const formatDate = (date) => {
        const date2 = new Date(date)
        const formattedDate = `${date2.getFullYear()}/${date2.getMonth() + 1}/${date2.getDate()}`
        return formattedDate;
    }



    return (
        <div>
            <head>
                <h2> <u>Reports</u> </h2>
            </head>

            <div className="frequency">
                <button onClick={AllTimeData}>All Time</button>
                <button onClick={dailyData}>Daily</button>
                <button onClick={weeklyData}>Weekly</button>
                <button onClick={monthlyData}>Monthly</button>
                <button onClick={yearlyData}>Yearly</button>
                Custom : From : <input type="date" name="" id="" onChange={(e) => { setFrom(e.target.value) }} /> To : <input type="date" name="" id="" onChange={(e) => { setTo(e.target.value) }} /> <button onClick={customDate}>Fetch</button>
            </div>

            <div className="totalMile">
                <h3>Total Mile Driven = {totalMiles}</h3>
            </div>
            <table>
                <tr>
                    <th> <u>License Plate</u></th>
                    <th> <u>Make</u></th>
                    <th> <u>VIN</u></th>
                    <th> <u>Model</u></th>
                    <th> <u>Type</u></th>
                    <th> <u>Date</u></th>
                    <th> <u>Miles Driven</u></th>
                </tr>
                {
                    data ?
                        <>
                            {data.map((i) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{i.licensePlate}</td>
                                            <td>{i.make}</td>
                                            <td>{i.vin}</td>
                                            <td>{i.model}</td>
                                            <td>{i.type}</td>
                                            <td>{formatDate(i.date)}</td>
                                            <td>{i.milesDriven}</td>
                                        </tr>
                                    </>
                                )
                            })}
                        </>
                        :
                        <></>
                }
            </table>


        </div>
    )
}

export default DashBoard