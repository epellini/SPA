import React, { useState, useEffect } from 'react';
import AddQuoteForm from './components/AddQuoteForm';
import EditQuoteForm from './components/EditQuoteForm';
import LikeButton from './components/LikeButton';
import QuoteDetail from './components/QuoteDetail';
import QuoteList from './components/QuoteList';
import TagManager from './components/TagManager';
import { getAllQuotes } from './services/quoteService';

function App() {
    const [quotes, setQuotes] = useState([]);
    const [selectedQuote, setSelectedQuote] = useState(null);

    // Function to fetch quotes
    const fetchQuotes = async () => {
        try {
            const data = await getAllQuotes();
            setQuotes(data);
        } catch (error) {
            console.error('Error fetching quotes:', error);
            // Optionally handle error (show message, etc.)
        }
    };

    // Call this function whenever a quote is added, edited, or deleted
    const handleQuoteChange = () => {
        fetchQuotes();
        setSelectedQuote(null); // Optionally reset the selected quote
    };

    // Function to handle quote selection
    const handleSelectQuote = (quote) => {
        setSelectedQuote(quote);
    };

    // Fetch quotes initially
    useEffect(() => {
        fetchQuotes();
    }, []);

    return (
        <div>
            <h1>Quotes App</h1>
            <AddQuoteForm onQuoteAdded={handleQuoteChange} />
            <QuoteList quotes={quotes} onSelectQuote={handleSelectQuote} />

            {selectedQuote && (
                <div>
                    <QuoteDetail quoteId={selectedQuote.id} />
                    <LikeButton quoteId={selectedQuote.id} onLike={handleQuoteChange} />
                    <EditQuoteForm quote={selectedQuote} onSave={handleQuoteChange} />
                    <TagManager quoteId={selectedQuote.id} onUpdate={handleQuoteChange} />
                </div>
            )}
        </div>
    );
}

export default App;