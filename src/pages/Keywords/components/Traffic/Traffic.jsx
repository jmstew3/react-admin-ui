import React, { useState, useEffect } from 'react';
import data from './tv-traffic.json';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link
} from '@mui/material';

const Traffic = () => {
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    // Directly setting data from the imported JSON
    setTrafficData(data);
  }, []);

  return (
    <div>
      <br />
      <Typography variant="h4" gutterBottom>
        Apollo Traffic 
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>Brand</TableCell> */}
              <TableCell>Medium</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Length</TableCell>
              <TableCell>Spots</TableCell>
              {/* <TableCell>Creative</TableCell> */}
              <TableCell>Rotation</TableCell>
              <TableCell>Station</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trafficData.map((item, index) => (
              <TableRow key={index}>
                {/* <TableCell>{item.Brand}</TableCell> */}
                <TableCell>{item.Medium}</TableCell>
                <TableCell>{item.Start || 'N/A'}</TableCell>
                <TableCell>{item.End || 'N/A'}</TableCell>
                <TableCell>{item.Length || 'N/A'}</TableCell>
                <TableCell>{item.Spots}</TableCell>
                {/* <TableCell>
                  {item.Creative ? (
                    <Link href={item.Creative} target="_blank" rel="noopener">
                      Link
                    </Link>
                  ) : 'N/A'}
                </TableCell> */}
                <TableCell>{item.Rotation || 'N/A'}</TableCell>
                <TableCell>{item.Station || 'N/A'}</TableCell>
                <TableCell>{item.Status || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Traffic;
