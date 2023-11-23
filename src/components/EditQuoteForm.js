import React, { useState } from 'react';
import { updateQuote } from '../services/quoteService';

const EditQuoteForm = ({ quote, onSave }) => {
    const [editedQuote, setEditedQuote] = useState({ ...quote });
    const [error, setError] = useState('');
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedQuote(prevQuote => ({ ...prevQuote, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await updateQuote(quote.id, editedQuote);
        onSave(editedQuote); // Callback to update the UI
      } catch (error) {
        setError('Failed to update quote');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Edit Quote</h2>
        {error && <p className="error">{error}</p>}
        // ... [rest of the form with editedQuote]
      </form>
    );
  };

export default EditQuoteForm;
