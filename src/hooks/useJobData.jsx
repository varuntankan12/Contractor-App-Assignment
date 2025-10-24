import { useEffect, useState } from "react";
import { MockJobsData } from "../statics/MockJobData";

const useJobData = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            // Simulate slight delay for realism
            const timer = setTimeout(() => {
                setJobs(MockJobsData);
                setIsLoading(false);
            }, 500);

            return () => clearTimeout(timer);
        } catch (e) {
            setError("Failed to load mock job data.");
            setIsLoading(false);
        }

    }, []);

    return { jobs, isLoading, error, setJobs };
};

export default useJobData;