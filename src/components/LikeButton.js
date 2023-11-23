import React from 'react';
import { addLikeToQuote } from '../services/quoteService'; 

const LikeButton = ({ quoteId, onLike }) => {
    const handleLike = async () => {
      try {
        await addLikeToQuote(quoteId);
        onLike(); // Callback to update the quote list or quote details
      } catch (error) {
        console.error('Failed to add like', error);
        // Handle error (show message, etc.)
      }
    };
  
    return (
      <button onClick={handleLike}>Like</button>
    );
  };

export default LikeButton;
