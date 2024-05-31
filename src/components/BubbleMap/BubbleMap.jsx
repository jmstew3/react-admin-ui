import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip as LeafletTooltip, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './bubbleMap.scss';

const BubbleMap = ({ data }) => {
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
        TotalRevenue: parseFloat(job.TotalRevenue) || 0, // Convert TotalRevenue to a number
    }));

    const getZipCode = (address) => {
        const match = address.match(/\b\d{5}\b/);
        return match ? match[0] : null;
    };

    const aggregatedData = zipData.reduce((acc, job) => {
        const zipCode = getZipCode(job.LocationAddress);
        if (zipCode) {
            if (!acc[zipCode]) {
                acc[zipCode] = { zipCode, totalRevenue: 0, lat: job.lat, lng: job.lng };
            }
            acc[zipCode].totalRevenue += job.TotalRevenue;
        }
        return acc;
    }, {});

    const zipCodeData = Object.values(aggregatedData);

    const calculateRadius = (revenue) => {
        if (revenue <= 0) return 5; // Default radius for zero or negative revenue
        const baseRadius = 5;
        const scaledRevenue = Math.log(revenue + 1) * 5; // Increase the scaling factor for higher revenue
        const zoomFactor = 1 / zoom;
        return baseRadius + (scaledRevenue * zoomFactor);
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
            <h1>Total Revenue By Zip Code</h1>
            <MapContainer center={[39.158524, -84.496819]} zoom={zoom} style={{ height: "100%", width: "100%" }}>
                <MapEvents />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {zipCodeData.map((zip, index) => (
                    <CircleMarker
                        key={index}
                        center={[parseFloat(zip.lat), parseFloat(zip.lng)]}
                        radius={calculateRadius(zip.totalRevenue)}
                        fillColor={getColor(zip.totalRevenue)}
                        color={getColor(zip.totalRevenue)}
                        fillOpacity={0.5}
                    >
                        <LeafletTooltip>
                            <span>Zip: {zip.zipCode}<br />Total Revenue: ${zip.totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                        </LeafletTooltip>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    );
};

export default BubbleMap;