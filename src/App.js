import React, { useState, useEffect } from 'react';
import "./App.css";

function App() {
  const [text, setText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [number, setNumber] = useState(300);
  const [temperature, setTemperature] = useState(0.6);

  const handleTemperatureChange = (event) => {
    setTemperature(Number(event.target.value));
  };  

  const handleNumberChange = (event) => {
    setNumber(Number(event.target.value));
  };

  const handleTextChange = event => setText(event.target.value);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleButtonClick = () => {
    fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: text, option: selectedOption, max_token: number, temperature: temperature, CHAT_TOKEN: '' })
    })
    .then(response => response.json())
    .then(data => {
      let question = 'Farid -> ' + text
      let reponse = 'AI -> ' + data.response
      setChatMessages([...chatMessages, question, reponse]);
      setText("")
    })
    .catch(error => console.error(error));

  };

  const handleClear = () => {
    setChatMessages([]);
  };

  return (  
    <div className="container">
      
      <div className="container">
        <div className="input-container">
          <table>
            <tbody>
            <tr>
              <td colSpan={2} align='center'><h1>CHAT with the AI</h1></td>
            </tr>
            <tr>
              <td>
                <label htmlFor="number" class="label">max TOKEN:</label>
              </td>
              <td>
                <input type="number" value={number} onChange={handleNumberChange} class="label"/>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="temperature" class="label">Enter temperature (0.0 to 1.0):</label>
              </td>
              <td>
                <input type="number" min="0" max="1" step="0.1" value={temperature} onChange={handleTemperatureChange} class="label" />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="prompt" class="label">prompt:</label>
              </td>
              <td>
                <select
                  type="prompt"
                  value={selectedOption}
                  onChange={handleOptionChange } class="label">
                  <option value="no_prompt">aucun prompt</option>
                  <option value="thera_prompt">prompt thérapeute</option>
                  <option value="thera_prompt_with_context">prompt thérapeute avec contexte</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        </div>


        <div className="chat-container">
          <div className="input-box">
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              className="input-field"
            />
            <button onClick={handleButtonClick} className="btn">Send</button>  
            <button onClick={handleClear} className="btn">Clear</button>        
          </div>
          <div>
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`message ${index % 2 === 0 ? "light-gray" : "dark-gray"}`}>
                {message}
              </div>
            ))}
          </div>          
        </div>
      </div>
    </div>
  );
}

export default App;
