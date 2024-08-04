import { useEffect, useState } from 'react';
import './App.css';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

//function App() {
//    const [forecasts, setForecasts] = useState<Forecast[]>();

//    useEffect(() => {
//        populateWeatherData();
//    }, []);

//    const contents = forecasts === undefined
//        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
//        : <table className="table table-striped" aria-labelledby="tabelLabel">
//            <thead>
//                <tr>
//                    <th>Date</th>
//                    <th>Temp. (C)</th>
//                    <th>Temp. (F)</th>
//                    <th>Summary</th>
//                </tr>
//            </thead>
//            <tbody>
//                {forecasts.map(forecast =>
//                    <tr key={forecast.date}>
//                        <td>{forecast.date}</td>
//                        <td>{forecast.temperatureC}</td>
//                        <td>{forecast.temperatureF}</td>
//                        <td>{forecast.summary}</td>
//                    </tr>
//                )}
//            </tbody>
//        </table>;

//    return (
//        <div>
//            <h1 id="tabelLabel">Weather forecast</h1>
//            <p>This component demonstrates fetching data from the server.</p>
//            {contents}
//        </div>
//    );

//    async function populateWeatherData() {
//        const response = await fetch('weatherforecast');
//        const data = await response.json();
//        setForecasts(data);
//    }
//}

function App() {

    const url = "http://localhost:5044/ExternalTariffProvider";
    const [error, setError] = useState(null);
    const [, setIsLoaded] = useState(false);
    const [data, setData] = useState<any[]>([]);

    const showAllTariff = () => {
        if (document.getElementById('consumption') && (document.getElementById('consumption') as HTMLInputElement)?.value) {
            const consumption = (document.getElementById('consumption') as HTMLInputElement)?.value;
            if (!isNaN(+consumption)) {
                fetch(url + "?Consumption=" + consumption, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                    })
                    .then(
                        (data) => {
                            setIsLoaded(true);
                            setData(data);
                            console.log("API fetched");
                        },

                        // Handle errors
                        (error) => {
                            setIsLoaded(true);
                            setError(error);
                            console.log("Error fetching API");
                        }
                    );
            }
        }
        else {
            alert("Enter value of Consumption in (kWh/year)")
        }
    }

    return (
        <div className="tariff-details">
            <form>
                <div>
                    <h2>Tariff Comparison</h2>
                    <label>Enter the Consumption in (kWh/year): </label>
                    <input type="text" placeholder="Enter Consumption.." id="consumption" />
                </div>

                <button type="button" className='btn-primary' onClick={showAllTariff}>Show all Tariffs</button>
            </form>

            {data != null && data.length > 0 ?
                <div className='list-view'>
                    {data.map((tariff, index) =>
                        <>
                            <ul>
                                <li key={index}>Tariff Name :{tariff.tariffName}</li>
                                <li key={index + 1}>Tariff Annual Costs : {tariff.annualCosts}/year</li>
                                <li key={index + 2}>Tariff Type : {tariff.type}</li>
                                <li key={index + 3}>Tariff Base Cost : {tariff.baseCost}</li>
                                <li key={index + 4}>Tariff Additional Kwh Cost : {tariff.additionalKwhCost}</li>
                                <li key={index + 5}>Tariff included Kwh: {tariff.includedKwh}</li>
                            </ul>
                        </>
                    )}
                </div>
                : <p></p>
            }

            {error && data.length == 0 ? <p>Error fetching API</p> : <p></p>}
        </div>

    );
}

export default App;