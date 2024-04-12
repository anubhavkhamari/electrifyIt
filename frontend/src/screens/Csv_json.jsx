import React from 'react';
import Papa from "papaparse";
import '../styles/csv_json.css';
import { toast } from 'react-toastify';

function Csv_json() {

    const saveData = async (data) => {
        try {
            for (let i = 1; i < data.length-1; i++) {
                console.log(data[i][5])
                fetch('http://localhost:9000/api/data/', {
                    method: 'POST',
                    body: JSON.stringify({
                        licensePlate: data[i][0],
                        make: data[i][1],
                        vin: data[i][2],
                        model: data[i][3],
                        type: data[i][4],
                        date: data[i][5],
                        milesDriven: data[i][6],
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                

            }
            toast.success("All data has been saved successfully")
        } catch (error) {

        }
    }
    return (
        <div className='csvmain'>


            <h3>Insert CSV File : &nbsp; </h3>
            <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                        Papa.parse(files[0], {
                            complete: function (results) {
                                console.log("Finished:", results.data);
                                console.log(typeof (results.data));
                                saveData(results.data)
                            }
                        }
                        )
                    }
                }}
            />
        </div>
    )
}

export default Csv_json