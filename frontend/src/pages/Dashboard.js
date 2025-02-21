import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [jobApplications, setJobApplications] = useState([]);

    // Fetch job applications from the backend
    useEffect(() => {
        const fetchJobApplications = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/job-application');
                const data = await response.json();
                setJobApplications(data.jobs);
            } catch (error) {
                console.error('Error fetching job applications:', error);
            }
        };

        fetchJobApplications();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Job Applications</h3>
            <ul>
                {jobApplications.map((job) => (
                <li key={job.id}>
                    {/* Display all job properties */}
                    {Object.entries(job).map(([key, value]) => (
                    <div key={key}>
                        <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {value}
                    </div>
                    ))}
                    
                    {/* Add a link to the update page */}
                    <Link to={`/update-job/${job.id}`}>
                    <button>Update</button>
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
