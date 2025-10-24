export const MockJobsData = [
    {
        id: "18763998",
        title: "Ceiling Insulation",
        address: "98 Beaconsfield St, Revesby NSW 2212, Australia",
        startTime: "2025-10-19T10:00:00", // Using ISO format for easy Date parsing
        endTime: "2025-10-20T14:00:00",
        size: 320,
        status: "in-progress", // upcoming, in-progress, completed
        isDelayed: false,
    },
    {
        id: "18763999",
        title: "Wall Insulation",
        address: "123 Kingsway, Sydney NSW 2000, Australia",
        startTime: "2025-10-17T10:00:00",
        endTime: "2025-10-18T14:00:00",
        size: 320,
        status: "completed",
        isDelayed: false,
    },
    {
        id: "18764000",
        title: "Floor Insulation",
        address: "98 Beaconsfield St, Revesby NSW 2212, Australia",
        startTime: "2025-10-17T10:00:00",
        endTime: "2025-10-19T14:00:00",
        size: 320,
        status: "completed",
        isDelayed: true, // Example of a delayed job
    },
    {
        id: "18764001",
        title: "Attic Sealing",
        address: "45 Collins Street, Melbourne VIC 3000, Australia",
        startTime: "2025-10-19T10:00:00",
        endTime: null, // Example of a job with no end time yet (upcoming)
        size: 250,
        status: "upcoming",
        isDelayed: false,
    },
];