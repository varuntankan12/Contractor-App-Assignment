// const JobOfferCard = ({ offer, handleAction }) => {
//     const { id, title, address, city, requestedDate, size } = offer;
//     const [status, setStatus] = useState('new'); // new, accepted, declined

import { useMemo, useState } from "react";
import { formatDateTime } from "../statics/FormatDateTime";

//     const handleButtonClick = (action) => {
//         // 1. Optimistically update the local status for immediate visual feedback (fade out, disable buttons)
//         setStatus(action);

//         // 2. Call the parent handler to update the global state/mock backend after a short delay
//         // This makes the transition smooth before the card is removed from the list
//         setTimeout(() => handleAction(id, action), 400);
//     };

//     const requestedDateTime = formatDateTime(requestedDate);
//     const requestedDateOnly = requestedDateTime.split(' ').slice(0, 3).join(' ');
//     const requestedTimeOnly = requestedDateTime.split(' ').slice(3).join(' ');

//     // Determine card styling based on status (Fading out and color border)
//     const cardClass = useMemo(() => {
//         if (status === 'accepted') return 'opacity-50 border-l-8 border-green-500 transform scale-95';
//         if (status === 'declined') return 'opacity-50 border-l-8 border-red-500 transform scale-95';
//         return 'border-l-8 border-yellow-500';
//     }, [status]);

//     const isActionTaken = status !== 'new';

//     return (
//         <div className={`bg-white p-4 mx-4 my-3 rounded-xl shadow-md transition-all duration-500 ${cardClass}`}>
//             <h3 className="text-lg font-bold text-gray-800 capitalize mb-1">{title}</h3>
//             <p className="text-sm text-gray-600 mb-3">
//                 at - <span className="font-semibold">{address}</span>
//             </p>

//             <div className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
//                 <p>
//                     <span className="text-blue-600 font-bold">Job Details</span>
//                 </p>
//                 <p><span className="font-semibold">Job ID:</span> {id}</p>
//                 <p><span className="font-semibold">City:</span> {city || 'N/A'}</p>
//                 <p><span className="font-semibold">Requested Date:</span> {requestedDateOnly} {requestedTimeOnly}</p>
//                 <p><span className="font-semibold">Estimated Area:</span> {size} m²</p>
//             </div>

//             <div className="flex justify-end space-x-3">
//                 <button
//                     onClick={() => handleButtonClick('declined')}
//                     disabled={isActionTaken}
//                     className={`text-sm font-semibold px-4 py-2 rounded-full transition duration-300 shadow-md ${status === 'declined'
//                         ? 'bg-red-600 text-white cursor-not-allowed'
//                         : isActionTaken
//                             ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
//                             : 'bg-red-100 text-red-600 hover:bg-red-200'
//                         }`}
//                 >
//                     {status === 'declined' ? 'Declined' : 'Decline'}
//                 </button>
//                 <button
//                     onClick={() => handleButtonClick('accepted')}
//                     disabled={isActionTaken}
//                     className={`text-sm font-semibold px-4 py-2 rounded-full transition duration-300 shadow-md ${status === 'accepted'
//                         ? 'bg-green-600 text-white cursor-not-allowed'
//                         : isActionTaken
//                             ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
//                             : 'bg-green-500 text-white hover:bg-green-600'
//                         }`}
//                 >
//                     {status === 'accepted' ? 'Accepted' : 'Accept'}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default JobOfferCard;











const JobOfferCard = ({ offer, handleAction }) => {
    const { id, title, address, city, requestedDate, size } = offer;
    const [status, setStatus] = useState("new");

    const handleButtonClick = (action) => {
        setStatus(action);
        setTimeout(() => handleAction(id, action), 400);
    };

    const { dateOnly, timeOnly } = formatDateTime(requestedDate);

    const cardClass = useMemo(() => {
        if (status === "accepted")
            return "opacity-50 border-l-8 border-green-500 scale-95";
        if (status === "declined")
            return "opacity-50 border-l-8 border-red-500 scale-95";
        return "border-l-8 border-yellow-500";
    }, [status]);

    const isActionTaken = status !== "new";

    return (
        <div className={`bg-white p-4 mx-4 my-3 rounded-xl shadow-md transition-all duration-500 ${cardClass}`}>
            <h3 className="text-lg font-bold text-gray-800 capitalize mb-1">
                {title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
                at - <span className="font-semibold">{address}</span>
            </p>

            <div className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-blue-600 font-bold mb-1">Job Details</p>
                <p><span className="font-semibold">Job ID:</span> {id}</p>
                <p><span className="font-semibold">City:</span> {city}</p>
                <p><span className="font-semibold">Requested:</span> {dateOnly} {timeOnly}</p>
                <p><span className="font-semibold">Estimated Area:</span> {size} m²</p>
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    onClick={() => handleButtonClick("declined")}
                    disabled={isActionTaken}
                    className={`text-sm font-semibold px-4 py-2 rounded-full shadow-md transition duration-300 ${status === "declined"
                        ? "bg-red-600 text-white"
                        : isActionTaken
                            ? "bg-gray-300 text-gray-600"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                >
                    {status === "declined" ? "Declined" : "Decline"}
                </button>
                <button
                    onClick={() => handleButtonClick("accepted")}
                    disabled={isActionTaken}
                    className={`text-sm font-semibold px-4 py-2 rounded-full shadow-md transition duration-300 ${status === "accepted"
                        ? "bg-green-600 text-white"
                        : isActionTaken
                            ? "bg-gray-300 text-gray-600"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                >
                    {status === "accepted" ? "Accepted" : "Accept"}
                </button>
            </div>
        </div>
    );
};


export default JobOfferCard;