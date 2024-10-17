import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';
import GeminiAPI from './GeminiAPI';
import "./ReactParse.css"

function ReactParse() {
    const [text, setText] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [error, setError] = useState(''); // State to track errors

    function extractText(event) {
        const file = event.target.files[0];
        const fileType = file.name.split('.').pop().toLowerCase();

        // Only allow PDF files
        if (fileType === 'pdf') {
            setError(''); // Clear any previous errors
            pdfToText(file)
                .then((text) => setText(text))
                .catch((error) => {
                    console.error("Failed to extract text from PDF", error);
                    setError("Failed to extract text from the PDF file.");
                });
        } else {
            setText(''); // Clear any previously extracted text
            setError('Invalid file format. Please upload a PDF file.'); // Set error message
        }
    }

    return (
        <>
            <div className='input-container'>
                <input 
                    type="file" 
                    accept="application/pdf" 
                    onChange={extractText} 
                />

                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

                <label htmlFor="job">Job Description</label>
                <input
                    type="text"
                    id="job"
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                />
            </div>
            <div>
                <GeminiAPI
                    ResumeKeywords={text.length > 0 ? text : ""}
                    JobDesc={jobDesc.length > 0 ? jobDesc : ""}
                />
            </div>
        </>
    );
}

export default ReactParse;
