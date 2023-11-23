import axios from 'axios';


//Quotes Methods

export const getAllQuotes = async () => {
  try {
    const response = await axios.get('/quotes');
    return response.data;
  } catch (error) {
    // Handle the error appropriately
    console.error('Error fetching quotes', error);
  }
};

export const getQuoteById = async (id) => {
    try {
      const response = await axios.get(`/quotes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching quote with ID ${id}`, error);
      throw error;
    }
  };

  export const addQuote = async (quote) => {

     // Check if the quote has tags and format them
     const formattedTags = quote.tags?.map(tagName => ({ name: tagName })) || [];

     const formattedQuote = {
      ...quote,
      tags: formattedTags // Use formatted tags
  };

    try {
      const response = await axios.post('/quotes', formattedQuote);
      return response.data;
    } catch (error) {
      console.error('Error adding a new quote', error);
      throw error;
    }
  };

  export const updateQuote = async (id, quote) => {
    try {
      await axios.put(`/quotes/${id}`, quote);
    } catch (error) {
      console.error(`Error updating quote with ID ${id}`, error);
      throw error;
    }
  };

  export const deleteQuote = async (id) => {
    try {
      await axios.delete(`/quotes/${id}`);
    } catch (error) {
      console.error(`Error deleting quote with ID ${id}`, error);
      throw error;
    }
  };

  // Like Methods

  export const addLikeToQuote = async (quoteId) => {
    try {
      await axios.post(`/quotes/${quoteId}/likes`);
    } catch (error) {
      console.error(`Error adding like to quote with ID ${quoteId}`, error);
      throw error;
    }
  };
  
  export const removeLikeFromQuote = async (quoteId) => {
    try {
      await axios.delete(`/quotes/${quoteId}/likes`);
    } catch (error) {
      console.error(`Error removing like from quote with ID ${quoteId}`, error);
      throw error;
    }
  };
  

  // Tag Methods

  export const getTagsByQuoteId = async (quoteId) => {
    try {
      const response = await axios.get(`/quotes/${quoteId}/tags`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching tags for quote with ID ${quoteId}`, error);
      throw error;
    }
  };

  export const addTagToQuote = async (quoteId, tagName) => {
    try {
      await axios.post(`/quotes/${quoteId}/tags`, { name: tagName });
    } catch (error) {
      console.error(`Error adding tag to quote with ID ${quoteId}`, error);
      throw error;
    }
  };
  

export const removeTagFromQuote = async (quoteId, tagId) => {
  try {
    await axios.delete(`/quotes/${quoteId}/tags/${tagId}`);
  } catch (error) {
    console.error(`Error removing tag from quote with ID ${quoteId}`, error);
    throw error;
  }
};

export const getAllTags = async () => {
  try {
      const response = await axios.get('/tags'); // Adjust the URL as per your API's endpoint
      return response.data;
  } catch (error) {
      console.error('Error fetching all tags', error);
      throw error;
  }
};

