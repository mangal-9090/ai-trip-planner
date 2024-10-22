import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './PlaceSearch.css'; // Import the CSS file

const PlaceSearch = ({ onSelectPlace }) => {  // Accept onSelectPlace as a prop
    const [places, setPlaces] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Load CSV file and parse it
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/world_places.csv');
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value);
            const results = Papa.parse(csv, { header: true });
            setPlaces(results.data);
        };
        fetchData();
    }, []);

    // Handle input change
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.length > 0) {
            const filteredSuggestions = places.filter(place => 
                (place.Country && place.Country.toLowerCase().startsWith(query.toLowerCase())) ||
                (place.Region && place.Region.toLowerCase().startsWith(query.toLowerCase()))
            );
            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    // Handle suggestion selection
    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(`${suggestion.Country}, ${suggestion.Region}`);
        setShowSuggestions(false);
        onSelectPlace(suggestion);  // Pass the selected suggestion to the parent
    };

    return (
        <div className="search-container">
            <input
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Enter location"
            />
            {showSuggestions && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="suggestion-item"
                        >
                            {suggestion.Country}, {suggestion.Region}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlaceSearch;
