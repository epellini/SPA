import React, { useState, useEffect } from 'react';
import { addTagToQuote, removeTagFromQuote, getTagsByQuoteId,  getAllTags } from '../services/quoteService';
import Autocomplete from '@mui/lab/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const TagManager = ({ quoteId, onUpdate }) => {
    const [tags, setTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const fetchedTags = await getTagsByQuoteId(quoteId);
                console.log('Fetched Tags:', fetchedTags); // Log the fetched tags
                setTags(fetchedTags);
            } catch (error) {
                setError('Failed to fetch tags');
            }
        };

        const fetchAllTags = async () => {
            try {
                // Assuming getTags method fetches all available tags
                const fetchedAllTags = await getAllTags(); 
                setAllTags(fetchedAllTags);
            } catch (error) {
                console.log('Error fetching all tags:', error);
            }
        };

        fetchTags();
        fetchAllTags();
    }, [quoteId]);

    const handleAddTag = async () => {
        if (!selectedTag) {
            setError('Please select a tag');
            return;
        }

        try {
            await addTagToQuote(quoteId, selectedTag);
            setTags([...tags, selectedTag]);
            setSelectedTag(null);
            setError('');
            onUpdate();
        } catch (error) {
            setError('Failed to add tag');
        }
    };

    const handleRemoveTag = async (tagId) => {
        // ... existing logic for removing a tag
    };

    return (
        <div>
            <h3>Manage Tags</h3>
            {error && <p className="error">{error}</p>}
            <Box sx={{ my: 2 }}>
                <Autocomplete
                    disablePortal
                    id="tag-autocomplete"
                    options={allTags.map((tag) => tag.name)}
                    value={selectedTag}
                    onChange={(event, newValue) => {
                        setSelectedTag(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tags"
                            margin="normal"
                        />
                    )}
                />
                <Button onClick={handleAddTag} variant="contained" color="primary">
                    Add Tag
                </Button>
            </Box>
            <ul>
                {tags.map(tag => (
                    <li key={tag.id}>
                        {tag.name}
                        <Button onClick={() => handleRemoveTag(tag.id)} variant="contained" color="secondary">
                            Remove
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TagManager;
