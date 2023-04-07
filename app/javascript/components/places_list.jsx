import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom/client";

const PlacesList = () => {
    const [loading, setLoading] = useState(true);
    const [loadedPlaces, setLoadedPlaces] = useState([]);

    useEffect(() => {
        // Hit the server and get the places list
        const apiEndpoint = "/api/places";
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedPlaces(data["places"]) 
                setLoading(false)
            })

    }, [])

    const loadingSection = (<div>Loading...</div>);
    const dataSection = loadedPlaces.map((place, index) => (
        <div key={index}>
            <table>
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Recent Upload Speed</th>
                    <th>Recent Upload Speed Units</th>
                    <th>Number of measurements</th>
                </tr>
                <tr>
                    <td>{place.name}</td>
                    <td>{place.city}</td>
                    <td>{place.most_recent_download_speed}</td>
                    <td>{place.most_recent_download_unit}</td>
                    <td>{place.number_of_measurements}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )) 
   
    if (loading) {
        return loadingSection

    } else {
        return dataSection
    }
}


const placesList = ReactDOM.createRoot(document.getElementById("places-list-container"));

placesList.render(<PlacesList />);