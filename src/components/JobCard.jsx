import React, { useCallback } from 'react';
import { formatDateTime } from "../statics/FormatDateTime";

const JobCard = ({ job }) => {
    const { title, address, startTime, endTime, size, id, status, isDelayed } = job;

    // Helper to determine status color and text
    const getStatusProps = useCallback(() => {
        switch (status) {
            case 'upcoming':
                return { text: 'Upcoming', bgColor: '#FACC15' };
            case 'in-progress':
                return { text: 'In Progress', bgColor: '#3B82F6' };
            case 'completed':
                return { text: 'Completed', bgColor: '#9CA3AF' }; // Using green for completed
            default:
                return { text: 'Pending', bgColor: 'bg-gray-400' };
        }
    }, [status]);

    const { text, bgColor } = getStatusProps();
    const hexOpacity = 50;

    const formattedStart = formatDateTime(startTime);
    const formattedEnd = formatDateTime(endTime);
    const startDate = formattedStart.split(' ').slice(0, 3).join(' ');
    const startTimeOnly = formattedStart.split(' ').slice(3).join(' ');
    const endDate = formattedEnd.split(' ').slice(0, 3).join(' ');
    const endTimeOnly = formattedEnd.split(' ').slice(3).join(' ');

    return (
        <div className={`p-4 mx-4 my-2 rounded-xl shadow-lg border-t-4 border-gray-300`} style={{ backgroundColor: `${bgColor}1A` }}>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-800 capitalize">{title}</h3>
                <span className={`text-xs text-white font-medium px-3 py-1 rounded-md bg-[${bgColor}]`}>
                    {text}
                </span>
            </div>

            <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Address:</span> {address}
            </p>

            <p className="text-sm text-gray-700">
                <span className="font-semibold">Starts:</span> {startDate} <span className="text-xs font-mono">{startTimeOnly}</span>
            </p>
            <p className="text-sm text-gray-700">
                <span className="font-semibold">Ends:</span> {endDate} <span className={`text-xs font-mono ${isDelayed ? 'text-[#EF4444] font-bold' : ''}`}>
                    {endTimeOnly} {isDelayed && <span className="ml-1 text-xs font-bold text-[#EF4444]">(Delayed)</span>}
                </span>
            </p>

            <p className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">Job size:</span> {size} m²
            </p>
            <p className="text-sm text-gray-700">
                <span className="font-semibold">Job ID:</span> {id}
            </p>
        </div>
    );
};

export default JobCard;