import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar } from "lucide-react";

const UpdateJob = ({ jobs, setJobs }) => {
    console.log(jobs);
    const { jobId } = useParams();
    console.log(jobId);
    const navigate = useNavigate();

    const job = useMemo(() => jobs.find((j) => j.id === jobId), [jobs, jobId]);

    const [estimatedDate, setEstimatedDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // If job not found
    if (!job) {
        return (
            <div className="p-4 pt-24 min-h-screen bg-gray-50">
                <h2 className="text-2xl font-extrabold text-red-600 mx-4">
                    Job Not Found
                </h2>
                <p className="text-gray-600 mx-4">
                    Could not find job with ID: {jobId}
                </p>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-4 mx-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Go to Dashboard
                </button>
            </div>
        );
    }

    // Helper functions
    const formatDate = (isoString) =>
        new Date(isoString).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    const formatDateOnly = (isoString) =>
        new Date(isoString).toISOString().split("T")[0];

    const requestedDate = formatDate(job.startTime);
    const completionDate = job.endTime ? formatDate(job.endTime) : "--/--/----";
    const isStarted = job.status === "in-progress" || job.status === "completed";

    // Start Job Handler
    const handleStartJob = () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (!estimatedDate) {
            setErrorMessage("Please enter an Estimated Completion Date.");
            return;
        }

        const completionDateISO = `${estimatedDate}T23:59:59`;

        // Update job list
        setJobs((prevJobs) =>
            prevJobs.map((j) =>
                j.id === jobId
                    ? {
                        ...j,
                        status: "in-progress",
                        endTime: completionDateISO,
                        isDelayed: false,
                    }
                    : j
            )
        );

        setSuccessMessage(
            "Job started successfully and moved to In Progress!"
        );

        // Navigate back to dashboard after a delay
        setTimeout(() => {
            navigate("/dashboard");
        }, 1500);
    };

    return (
        <div className="p-4 pt-24 min-h-screen bg-gray-50">
            {/* Back Button */}
            <button
                onClick={() => navigate("/dashboard")}
                className="text-blue-600 font-semibold mb-4 flex items-center"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Dashboard
            </button>

            {/* Job Details */}
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4 capitalize">
                {job.title} Job
            </h2>

            <div className="text-sm text-gray-700 space-y-1 mb-6">
                <p>
                    <span className="font-semibold">Job ID:</span> {job.id}
                </p>
                <p>
                    <span className="font-semibold">Address:</span> {job.address}
                </p>
                <p>
                    <span className="font-semibold">Requested date:</span>{" "}
                    {requestedDate}
                </p>
                <p>
                    <span className="font-semibold">Completion date:</span>{" "}
                    {completionDate}
                </p>
                <p>
                    <span className="font-semibold">Job type:</span> {job.title}
                </p>
                <p>
                    <span className="font-semibold">Estimated area:</span> {job.size} m²
                </p>
            </div>

            {/* Update Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {isStarted ? "In Progress" : "Not Started"}
                </h3>

                {isStarted ? (
                    <p className="text-green-600 font-medium">
                        This job is currently <b>In Progress</b> and is estimated to be
                        complete by {completionDate}.
                    </p>
                ) : (
                    <>
                        <p className="text-gray-600 mb-4">
                            This job has not started yet. Please enter an estimated completion
                            date to start the job.
                        </p>

                        <label
                            htmlFor="estimatedDate"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Estimated Completion Date{" "}
                            <span className="text-red-500">*</span>
                        </label>

                        <div className="relative mb-4">
                            <input
                                id="estimatedDate"
                                type="date"
                                value={estimatedDate}
                                onChange={(e) => setEstimatedDate(e.target.value)}
                                min={formatDateOnly(new Date().toISOString())}
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errorMessage ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>

                        {errorMessage && (
                            <p className="text-red-600 text-sm mb-4 font-medium">
                                {errorMessage}
                            </p>
                        )}
                        {successMessage && (
                            <p className="text-green-600 text-sm mb-4 font-medium">
                                {successMessage}
                            </p>
                        )}

                        <div className="flex justify-end">
                            <button
                                onClick={handleStartJob}
                                className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-150"
                            >
                                Start
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default UpdateJob