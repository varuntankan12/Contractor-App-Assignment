# Contractor Job Management Dashboard (React)

This is a single-file React application designed to simulate a dashboard for a field contractor. It allows users to manage new job offers, track the progress of ongoing jobs, and formally mark tasks as completed, including a required image upload process.

The entire application logic, components, and mock data are contained within a single `Dashboard.jsx` file, making it easy to deploy and test.

---

## 🚀 Features

- **Job Offers Management:** Review new job opportunities and accept or decline them. Accepted jobs move to the Upcoming status.  
- **Job Lifecycle Tracking:** Jobs are categorized into Upcoming, In Progress, and Completed statuses.  
- **Job Start Process:** Upcoming jobs can be started, requiring the user to set an estimated completion date.  
- **In Progress Job Details:** Dedicated page for managing active work:
  - **Checklist:** Mark specific tasks as completed.  
  - **Image Upload (Proof of Work):** Users can upload images (simulated) and provide a thumbnail/description via a modal.  
- **Completion Guardrail:** A minimum of 3 images are required before a job can be marked as completed.  
- **Save Progress:** Allows temporary saving of checklist status, comments, and images.  
- **Immutability upon Completion:** Once a job is marked as completed, its status and content are locked (simulated by logic preventing further updates).  
- **Responsive Design:** Built to be fully responsive for mobile usage.  

---

## 🛠️ Technology Stack

- **Frontend:** React (Functional Components & Hooks)  
- **Styling:** Tailwind CSS (utility classes are assumed to be available in the execution environment)  
- **Data:** Local JavaScript state (for this simulation)  

---

## 💻 Getting Started

Since this is a single `.jsx` file, setting up the project requires a basic React environment (e.g., using Vite or Create React App) that is configured to handle JSX.

### Prerequisites

- Node.js  
- npm (or yarn/pnpm)  

### Installation

**Clone the Repository:**

# Clone the repository
  git clone https://github.com/varuntankan12/Contractor-App-Assignment.git

# Change directory
  cd Contractor-App-Assignment

# Install dependencies
  npm install

# Run the application using : 
  npm run dev 

Visit [http://localhost:5173](http://localhost:5173) to view the dashboard. 

