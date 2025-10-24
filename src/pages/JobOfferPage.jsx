// import React, { useState, useMemo } from "react";
import Footer from "../components/Footer";
import JobOfferCard from "../components/JobOfferCard";

const JobOfferPage = ({ offers, handleJobAction }) => {

    return (
        <div className="p-4 py-24 min-h-screen bg-gray-50">
            <h2 className="text-2xl font-extrabold text-gray-900 mx-4">
                Job Offers
            </h2>
            <p className="text-sm text-gray-600 mx-4 mb-4">
                Review your latest insulation job offers below. You can view details,
                accept jobs you wish to take, or decline those you're unable to
                complete.
            </p>

            {offers.length === 0 ? (
                <div className="text-center p-8 m-4 rounded-xl bg-white shadow-lg text-gray-600">
                    <p className="font-bold">🎉 All caught up!</p>
                    <p>No new job offers at this time.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {offers.map((offer) => (
                        <JobOfferCard
                            key={offer.id}
                            offer={offer}
                            handleAction={handleJobAction}
                        />
                    ))}
                </div>
            )}

            <Footer />
        </div>
    );
};

export default JobOfferPage;