import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const response = await axios.post('http://localhost:3004/bfhl', { data: parsedInput.data });
            setResponseData(response.data);
            console.log(response);
        } catch (error) {
            console.error("Invalid JSON or API error:", error);
        }
    };

    const handleOptionChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    const renderResponse = () => {
        if (!responseData) return null;
        const { numbers, alphabets, highest_lowercase_alphabet } = responseData;

        return (
            <div>
                {selectedOptions.includes('Numbers') && <div>Numbers: {numbers.join(', ')}</div>}
                {selectedOptions.includes('Alphabets') && <div>Alphabets: {alphabets.join(', ')}</div>}
                {selectedOptions.includes('Highest lowercase alphabet') && (
                    <div>Highest Lowercase Alphabet: {highest_lowercase_alphabet.join(', ')}</div>
                )}
            </div>
        );
    };

    return (
        <div>
            <h1>Frontend</h1>
            <textarea value={jsonInput} onChange={handleInputChange} placeholder='Enter JSON input' />
            <button onClick={handleSubmit}>Submit</button>

            {responseData && (
                <select multiple={true} onChange={handleOptionChange}>
                    <option value="Numbers">Numbers</option>
                    <option value="Alphabets">Alphabets</option>
                    <option value="Highest lowercase alphabet">Highest Lowercase Alphabet</option>
                </select>
            )}

            {renderResponse()}
        </div>
    );
};

export default App;
