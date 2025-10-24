import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Logout from "../pages/Logout";
import Dashboard from "../pages/Dashboard";
import JobOfferPage from "../pages/JobOfferPage";
import useJobData from "../hooks/useJobData";
import { MockNewOffersData } from "../statics/MockNewOffersData";
import { useCallback, useState } from "react";
import UpdateJob from "../pages/UpdateJob";
import { JobProgressData } from "../statics/JobProgressData";
import JobProgressPage from "../pages/JobProgress";

const AppRoutes = () => {

    const { jobs, isLoading, error, setJobs } = useJobData();
    const [offers, setOffers] = useState(MockNewOffersData);
    const [inProgressData, setInProgressData] = useState(JobProgressData);

    const handleJobAction = useCallback((jobId, action) => {
        setOffers(prevOffers => {
            const job = prevOffers.find(o => o.id === jobId);
            if (!job) return prevOffers;

            const updatedOffers = prevOffers.filter(o => o.id !== jobId);

            if (action === "accepted") {
                // check if job already exists
                setJobs(prevJobs => {
                    const alreadyExists = prevJobs.some(j => j.id === job.id);
                    if (alreadyExists) return prevJobs;

                    // create new accepted job for dashboard
                    const newJob = {
                        ...job,
                        startTime: job.requestedDate,
                        endTime: null,
                        status: "upcoming",
                        isDelayed: false,
                        isOffer: false,
                    };
                    return [newJob, ...prevJobs];
                });
            }

            return updatedOffers;
        });
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard" element={<Dashboard jobs={jobs} isLoading={isLoading} error={error} />} />
            <Route path="/joboffers" element={<JobOfferPage offers={offers} handleJobAction={handleJobAction} />} />

            <Route path="/updatejob/:jobId" element={<UpdateJob jobs={jobs} setJobs={setJobs} />} />
            <Route path="/jobprogress/:jobId" element={<JobProgressPage jobs={jobs} setJobs={setJobs} inProgressData={inProgressData} setInProgressData={setInProgressData} />} />
        </Routes>
    );
};

export default AppRoutes;
