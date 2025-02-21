import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [jobApplications, setJobApplications] = useState([]);

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

    const deleteJobApplication = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/job-application/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setJobApplications((prevJobs) => prevJobs.filter((job) => job.id !== id));
            } else {
                alert("Error deleting job application.");
            }
        } catch (error) {
            console.error("Error deleting job application:", error);
        }
    };

    return (
        <div>
            <h2>Job Applications Dashboard</h2>
            <Link to="/add-job">Add New Job Application</Link>
            <ul>
                {jobApplications.map((job) => (
                    <li key={job.id}>
                        <div>
                            <h3>{job.company_name} - {job.job_title}</h3>
                            <p>{job.application_status}</p>
                            <p>{job.application_date}</p>
                            <Link to={`/update-job/${job.id}`}>Edit</Link>
                            <button onClick={() => deleteJobApplication(job.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
