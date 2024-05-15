import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './tempTable.scss';

const CityDataTable = () => {
    const cityData = [
        { city: "Cincinnati", totalRevenue: 11322999.35, jobsCompleted: 17765 },
        { city: "South Lebanon", totalRevenue: 54645.28, jobsCompleted: 97 },
        { city: "Milford", totalRevenue: 267428.18, jobsCompleted: 472 },
        // Add other cities here
        { city: "Loveland", totalRevenue: 808074.77, jobsCompleted: 1166 },
        { city: "Lebanon", totalRevenue: 158511.01, jobsCompleted: 289 },
        // Continue adding other cities as needed
    ];

    return (
    <div className="tempTable">
        <h1>Jobs Completed By Category</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>City</TableCell>
                        <TableCell align="right">Total Revenue ($)</TableCell>
                        <TableCell align="right">Jobs Completed</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cityData.map((city, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {city.city}
                            </TableCell>
                            <TableCell align="right">{city.totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                            <TableCell align="right">{city.jobsCompleted}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
    );
};

export default CityDataTable;