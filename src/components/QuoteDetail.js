import React, { useState, useEffect } from 'react';
import TagManager from './TagManager';
import { getQuoteById } from '../services/quoteService';

const QuoteDetail = ({ quoteId }) => {
    const [quote, setQuote] = useState(null);
    const [error, setError] = useState('');

    // Define fetchQuote outside of useEffect so it can be used elsewhere in the component
    const fetchQuote = async () => {
        try {
            const data = await getQuoteById(quoteId);
            setQuote(data);
        } catch (error) {
            setError('Failed to fetch quote details');
        }
    };

    useEffect(() => {
        if (quoteId) {
            fetchQuote();
        }
    }, [quoteId, fetchQuote]); // Add fetchQuote to the dependency array of useEffect

    const handleTagsUpdate = () => {
        fetchQuote(); // Re-fetch the quote details to update the tag list
    };

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!quote) {
        return <p>Loading quote details...</p>;
    }

    return (
        <div>
            <h2>{quote.text} by {quote.author}</h2>
            {/* Display other details of the quote as needed */}
            <TagManager quoteId={quoteId} onUpdate={handleTagsUpdate} />
        </div>
    );
};

export default QuoteDetail;
