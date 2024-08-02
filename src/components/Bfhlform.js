import React, { useState } from 'react';
import { postData } from '../api/api'; // Import the API function

function Bfhlform() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSubmit = async () => {
        setError('');
        setResponseData(null);

        try {
            // Validate and parse JSON input
            const parsedData = JSON.parse(jsonInput);

            if (!parsedData.data || !Array.isArray(parsedData.data)) {
                throw new Error('Invalid JSON format. "data" should be an array.');
            }

            // Check that each item is either a single alphabet character or a number as a string
            const isValid = parsedData.data.every(item => 
                (typeof item === 'string' && /^[a-zA-Z]$/.test(item)) || 
                (typeof item === 'string' && /^\d+$/.test(item))
            );

            if (!isValid) {
                throw new Error('Invalid input. Array should contain only single alphabet characters or numbers.');
            }

            // Send data to the backend API
            const data = await postData(parsedData);
            setResponseData(data);
            setShowDropdown(true);
        } catch (error) {
            setError(error.message || 'Network error occurred');
        }
    };

    const handleDropdownChange = (event) => {
        const value = event.target.value;
        setSelectedOptions(prevOptions =>
            prevOptions.includes(value)
                ? prevOptions.filter(option => option !== value)
                : [...prevOptions, value]
        );
    };

    const getDisplayData = () => {
        if (!responseData) return '';

        let displayData = [];

        if (selectedOptions.includes('alphabets')) {
            displayData.push(
                responseData.alphabets.length > 0 
                    ? (
                        <div style={{ color: 'green' }}>
                            <strong>Alphabets:</strong><br />
                            {responseData.alphabets.join(', ')}
                        </div>
                    )
                    : <div style={{ color: 'green' }}>No alphabets found</div>
            );
        }

        if (selectedOptions.includes('numbers')) {
            displayData.push(
                responseData.numbers.length > 0 
                    ? (
                        <div style={{ color: 'blue' }}>
                            <strong>Numbers:</strong><br />
                            {responseData.numbers.join(', ')}
                        </div>
                    )
                    : <div style={{ color: 'blue' }}>No numbers found</div>
            );
        }

        if (selectedOptions.includes('highest_alphabet')) {
            displayData.push(
                responseData.highest_alphabet.length > 0 
                    ? (
                        <div style={{ color: 'red' }}>
                            <strong>Highest Alphabet:</strong><br />
                            {responseData.highest_alphabet.join(', ')}
                        </div>
                    )
                    : <div style={{ color: 'red' }}>No highest alphabet found</div>
            );
        }

        return displayData.length > 0 ? displayData : <div>No data available</div>;
    };

    return (
        <div>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here, e.g., { "data": ["A", "C", "z", "123"] }'
            />
            <button onClick={handleSubmit}>Submit</button>

            {error && <div className="error">{error}</div>}

            {showDropdown && (
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="alphabets"
                            checked={selectedOptions.includes('alphabets')}
                            onChange={handleDropdownChange}
                        />
                        Alphabets
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="numbers"
                            checked={selectedOptions.includes('numbers')}
                            onChange={handleDropdownChange}
                        />
                        Numbers
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="highest_alphabet"
                            checked={selectedOptions.includes('highest_alphabet')}
                            onChange={handleDropdownChange}
                        />
                        Highest Alphabet
                    </label>

                    <div className="response">
                        {getDisplayData()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Bfhlform;
