import React, { useMemo, useState } from 'react'
// import useJobData from '../hooks/useJobData';
import ProfileCard from '../components/ProfileCard';
import JobCard from '../components/JobCard';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';


const JobFilter = ({ activeFilter, setActiveFilter }) => {
    const filters = [
        { key: 'all', label: 'All', style: 'bg-[#9CA3AF]' },
        { key: 'upcoming', label: 'Upcoming', style: 'bg-[#FACC15]' },
        { key: 'in-progress', label: 'In Progress', style: 'bg-[#3B82F6]' },
        { key: 'completed', label: 'Completed', style: 'bg-green-500/80' },
    ];

    return (
        <div className="flex justify-start gap-3 bg-white py-2 px-4 mt-2.5 mx-4 rounded-lg">
            {filters.map((filter) => (
                <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`
                        text-xs font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-300
                        ${activeFilter === filter.key
                            ? `${filter.style} text-white ring-2 ring-offset-2 ${filter.style}`
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }
                    `}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
};

const Dashboard = ({ jobs, isLoading, error }) => {
    
    const [activeFilter, setActiveFilter] = useState('in-progress'); // Default to 'In Progress'
    const navigate = useNavigate();

    const filteredJobs = useMemo(() => {
        console.log(jobs);
        if (!jobs) return [];

        // If 'all' is active, return the entire list of jobs
        if (activeFilter === 'all') {
            return jobs;
        }

        return jobs.filter(job => job.status === activeFilter);
    }, [jobs, activeFilter]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600 text-lg">Loading dashboard data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-100 p-4">
                <p className="text-red-700 font-semibold">Error: {error}</p>
            </div>
        );
    }

    const handleCardClick = (job) => {
        if (job.status === "upcoming") {
            navigate(`/updatejob/${job.id}`);
        } else if (job.status === "in-progress") {
            navigate(`/jobprogress/${job.id}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F4F4] font-sans py-20">

            <ProfileCard />
            <JobFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            <main className="p-4 pt-0 space-y-4">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div key={job.id} onClick={() => handleCardClick(job)} className="cursor-pointer">
                            <JobCard job={job} />
                        </div>
                    ))
                ) : (
                    <div className="text-center p-8 m-4 rounded-xl bg-white shadow-lg text-gray-600">
                        No jobs found for the '{activeFilter.replace('-', ' ')}' status.
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default Dashboard