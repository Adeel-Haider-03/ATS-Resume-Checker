import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown'; // Import the ReactMarkdown component
import './GeminiAPI.css';

function GeminiAPI({ ResumeKeywords, JobDesc }) {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to call the API
  const apiCall = async () => {
    if (!ResumeKeywords || !JobDesc) {
      setError('Please provide both resume keywords and job description.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `This is the resume: ${ResumeKeywords} and this is the job description: ${JobDesc}. Please provide an ATS score out of 100 and suggestions for improvement.`;

      const result = await model.generateContent(prompt);
      setResponse(result.response.text());
     // console.log(result.response.text());

    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching the response. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <button onClick={apiCall} disabled={isLoading}>Check</button>
      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      {/* Render the AI response using ReactMarkdown */}
      {response && !isLoading && (
        <div className="response">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default GeminiAPI;
