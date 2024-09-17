import React, { useState } from 'react';
import useGetKeywordList from '../../hooks/useGetKeywordList';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, CircularProgress
} from '@mui/material';
import './keywordList.scss';

const KeywordList = () => {
    const { keywordList, keywordListError, keywordListisLoading } = useGetKeywordList();
    const [searchTerm, setSearchTerm] = useState('');

    // Filtered keyword list based on search term
    const filteredKeywordList = keywordList ? keywordList.filter(({ name, keyword, tp_brand }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by `name`
        keyword.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by `keyword`
        (tp_brand && tp_brand.toLowerCase().includes(searchTerm.toLowerCase())) // Optionally filter by `tp_brand`
    ) : [];

    // Render loading state
    if (keywordListisLoading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <CircularProgress />
                <p>Loading...</p>
            </div>
        );
    }

    // Render error state
    if (keywordListError) {
        return (
            <p>Error loading keyword list: {keywordListError.message}</p>
        );
    }

    return (
        <div>
            <h1>Keyword List</h1>

            {/* Search bar with white border and text */}
            <TextField
                label="Search Keywords or Name"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                    style: { color: '#fff', borderColor: '#fff' },
                    classes: {
                        notchedOutline: 'Mui-focused', // to keep the outline white on focus
                    }
                }}
                InputLabelProps={{
                    style: { color: '#fff' } // Label text color white
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#fff',
                        },
                        '&:hover fieldset': {
                            borderColor: '#fff',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#fff',
                        },
                    },
                }}
            />

            {/* Check if there are any keywords to display */}
            {filteredKeywordList.length === 0 ? (
                <p>No keywords available.</p>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Brand/Name</strong></TableCell>
                                <TableCell><strong>Keyword</strong></TableCell>
                                <TableCell><strong>Type</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredKeywordList.map(({ id, name, keyword, tp_brand }) => (
                                <TableRow key={id}>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{keyword}</TableCell>
                                    <TableCell>{tp_brand || 'N/A'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default KeywordList;
