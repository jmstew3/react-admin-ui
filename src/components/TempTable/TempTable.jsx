import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';
import './tempTable.scss';

const CityDataTable = ({ data }) => {
    // Check if data and data.cityResults are defined
    if (!data || !data.cityResults || data.cityResults.length === 0) {
        return <div className="tempTable">No data available</div>;
    }

    console.log(data);

    const [order, setOrder] = useState('desc'); // Default order is descending
    const [orderBy, setOrderBy] = useState('totalRevenue'); // Default sorting column is totalRevenue

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const cityData = [];
    for (let i = 0; i < data.cityResults.length; i++) {
        console.log(data.cityResults[i])
        cityData.push({
            city: data.cityResults[i].city,
            totalRevenue: data.cityResults[i].totalRevenue,
            jobsCompleted: data.cityResults[i].jobsCompleted
        });
    }

    const sortedCityData = cityData.sort((a, b) => {
        if (orderBy === 'totalRevenue' || orderBy === 'jobsCompleted') {
            return order === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
        } else {
            return order === 'asc' ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]);
        }
    });

    return (
        <div className="tempTable">
            <h1>Top-20 Revenue By Cities</h1>
            <TableContainer component={Paper} style={{ height: "500px", overflow: "scroll" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'city'}
                                    direction={orderBy === 'city' ? order : 'asc'}
                                    onClick={() => handleRequestSort('city')}
                                >
                                    City
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === 'totalRevenue'}
                                    direction={orderBy === 'totalRevenue' ? order : 'asc'}
                                    onClick={() => handleRequestSort('totalRevenue')}
                                >
                                    Total Revenue ($)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === 'jobsCompleted'}
                                    direction={orderBy === 'jobsCompleted' ? order : 'asc'}
                                    onClick={() => handleRequestSort('jobsCompleted')}
                                >
                                    Jobs Completed
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedCityData.map((city, index) => (
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