import React, { useState, useEffect } from 'react';
import { addQuote, getAllTags } from '../services/quoteService';
import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const AddQuoteForm = ({ onQuoteAdded }) => {
    const [quote, setQuote] = useState({ text: '', author: '', tags: [] });
    const [allTags, setAllTags] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch tags from the API backend
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const fetchedTags = await getAllTags();
                if (fetchedTags && fetchedTags.$values) {
                    // Extract the $values array and map to get tag names
                    setAllTags(fetchedTags.$values.map(tag => tag.name));
                } else {
                    console.log("Unexpected tag data format:", fetchedTags);
                }
            } catch (error) {
                console.log('Error fetching tags:', error);
            }
        };

        fetchTags();
    }, []);

    const handleQuoteChange = (event) => {
        const { name, value } = event.target;
        setQuote({ ...quote, [name]: value });
    };

    const handleTagChange = (event, value) => {
        setQuote({ ...quote, tags: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addQuote(quote);
            setQuote({ text: '', author: '', tags: [] }); // Reset form
            setSuccessMessage('Quote added successfully!'); // Set success message
            if (onQuoteAdded) {
                onQuoteAdded(); // Refresh quotes
            }
            setTimeout(() => setSuccessMessage(''), 2000); // Clear message after 3 seconds

             // Set a timeout for 2 seconds before refreshing the page
        setTimeout(() => {
            window.location.reload(); // This will refresh the page
        }, 2000); // 2000 milliseconds = 2 seconds


        } catch (error) {
            setError('Failed to add quote');
            setSuccessMessage(''); // Ensure success message is cleared on error
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h2" gutterBottom>
                Add a New Quote
            </Typography>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    label="Quote Text"
                    name="text"
                    value={quote.text}
                    onChange={handleQuoteChange}
                    required
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Author"
                    name="author"
                    value={quote.author}
                    onChange={handleQuoteChange}
                    required
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <Autocomplete
                    multiple
                    options={allTags}
                    getOptionLabel={(option) => option}
                    value={quote.tags}
                    onChange={handleTagChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tags"
                            margin="normal"
                        />
                    )}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                    Add Quote
                </Button>
            </Box>
        </Container>
    );
};

export default AddQuoteForm;
