import React from "react";

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

import { formatRelative } from "data-fns";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

import mapStyles from "../mapStyles";


const libraries = ["places"];
const mapContainerStyle = {
    width: '65vw',
    height: '50vh',
};
const center = {
    lat: 46.0037,
    lng: 8.9511
};

const options = {
    styles: mapStyles,
    disableDefualtUI: true,
}



console.log(options);

export default function Maps() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    console.log("This is the Api Key ", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

    const [markers, setMarkers] = React.useState({});

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestion,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 46.0037, lng: () => 8.9511 },
            radius: 200 * 1000,
        },
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";



    return (

        <div>

        
{/* 
            <div className="search">
                <Combobox
                    onSelect={(address) => {
                        console.log(address);
                    }}
                >
                    <ComboboxInput
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        disabled={!ready}
                        placeholder="Enter an address"
                    />
                    <ComboboxPopover>
                        {status === "OK" &&
                            data.map(({ id, descripiton }) => (
                                <ComboboxOption key={id} value={descripiton} />
                            ))}
                    </ComboboxPopover>
                </Combobox>
            </div> */}


            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onClick={(event) => {
                    console.log(event)
                    setMarkers({
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                    })
                }, console.log("Its clicking", markers)}
            ></GoogleMap>   


        </div>
    )
}