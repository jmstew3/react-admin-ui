import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip as LeafletTooltip, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './bubbleMap.scss';

const BubbleZipTechCloseRate = ({ data }) => {
    const [zoom, setZoom] = useState(10);

    const MapEvents = () => {
        useMapEvents({
            zoomend: (e) => {
                setZoom(e.target._zoom);
            },
        });
        return null;
    };

    console.log(data);

    const zipData = data.map(job => ({
        lat: job.Lat,
        lng: job.Lng,
        JobId: job.JobId,
        CompletionDate: job.CompletionDate,
        CreatedDate: job.CreatedDate,
        CustomerId: job.CustomerId,
        CustomerType: job.CustomerType,
        GrossMargin: job.GrossMargin,
        JobStatus: job.JobStatus,
        LeadGeneratedFromSource: job.LeadGeneratedFromSource,
        LocationAddress: job.LocationAddress,
        LocationName: job.LocationName,
        MemberStatus: job.MemberStatus,
        ScheduledDate: job.ScheduledDate,
        ScheduledDateYearMonth: job.ScheduledDateYearMonth,
        Total: job.Total,
        isConverted: job.isConverted,
        TotalRevenue: parseFloat(job.TotalRevenue) || 0, // Convert TotalRevenue to a number
    }));

    let tickets = 0;
    for (let i = 0; i < zipData.length; i++) {
        tickets += zipData[i].isConverted;
    }

    console.log(tickets);

    const getZipCode = (address) => {
        const match = address.match(/\b\d{5}\b/);
        return match ? match[0] : null;
    };

    const aggregatedData = zipData.reduce((acc, job) => {
        const zipCode = getZipCode(job.LocationAddress);
        const isConverted = job.isConverted == true ? 1 : 0;        

        if (zipCode) {
            if (!acc[zipCode]) {
                acc[zipCode] = { zipCode, lat: job.lat, lng: job.lng, convertedCount: 0, totalRevenue: 0, tickets: 0 };
            }
            acc[zipCode].totalRevenue += job.TotalRevenue;
            acc[zipCode].convertedCount += isConverted;
            acc[zipCode].tickets++;
            // console.log(acc[zipCode].convertedCount);
        }
        return acc;
    }, {});

    const zipCodeData = Object.values(aggregatedData);

    const calculateRadius = (converted) => {
        if (converted <= 0) return 0; // Default radius for zero or negative converted
        const baseRadius = 1;
        const scaledConverted = Math.log(converted + 1) * 25; // Increase the scaling factor for higher converted
        const zoomFactor = 1 / zoom;
        return baseRadius + (scaledConverted * zoomFactor);
    };

    // const getColor = (revenue) => {
    //     if (revenue > 10000) return "#59c3a3"; // High revenue
    //     if (revenue > 5000) return "#8784d2"; // Medium revenue
    //     return "#f5be4c"; // Low revenue
    // };
    const getColor = (revenue) => {
        if (revenue > 10000) return "#59c3a3"; // High revenue
        if (revenue > 5000) return "#59c3a3"; // Medium revenue
        return "#59c3a3"; // Low revenue
    };

    return (
        <div className="bubble-map">
            <h1>Tech Close Rate By Zip Code</h1>
            <MapContainer center={[39.158524, -84.496819]} zoom={zoom} style={{ height: "100%", width: "100%" }}>
                <MapEvents />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
   
                {zipCodeData.map((zip, index, tickets) => (
                    <CircleMarker
                        key={index}
                        center={[parseFloat(zip.lat), parseFloat(zip.lng)]}
                        radius={calculateRadius(zip.convertedCount)}
                        fillColor={getColor(zip.convertedCount)}
                        color={getColor(zip.convertedCount)}
                        fillOpacity={0.5}
                    >
                        <LeafletTooltip>
                            <span>Zip: {zip.zipCode}<br/> Converted Tickets: {zip.convertedCount}<br/> Tickets Count: {zip.tickets} <br /> <strong>Tech Close Rate: {(parseInt(zip.convertedCount) / zip.tickets * 100).toFixed(2)}%</strong></span>
                        </LeafletTooltip>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    );
};

export default BubbleZipTechCloseRate;