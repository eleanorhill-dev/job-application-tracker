import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddApplication from './pages/AddApplication';
import UpdateApplication from './pages/UpdateApplication';

function App() {

  const [jobs, setJobs] = useState([]);

  const fetchJobApplications = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/job-application");
      const data = await response.json();
      setJobs(data.jobs); 
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };

  // Update job application function
  const updateJobApplication = async (id, updatedJobDetails) => {
    try {
      const response = await fetch(`http://localhost:5000/api/job-application/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedJobDetails),
      });
      const data = await response.json();
      
      if (response.ok) {
        alert("Job application updated successfully!");
        fetchJobApplications(); 
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating job application:", error);
      alert("An error occurred while updating the job application.");
    }
  };

  useEffect(() => {
    fetchJobApplications();
  }, []);

  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/add-job">Add Job Application</Link></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard jobs={jobs} />} />
          <Route path="/add-job" element={<AddApplication />} />
          <Route path="/update-job/:id" element={<UpdateApplication updateJob={updateJobApplication} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
