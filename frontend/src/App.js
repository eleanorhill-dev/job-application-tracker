import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; // Import Dashboard component
import AddApplication from './pages/AddApplication'; // Import AddApplication component

function App() {

  const [jobs, setJobs] = useState([]);

  // Fetch job applications when the component mounts
  useEffect(() => {
    const fetchJobApplications = async () => {
      const response = await fetch("http://localhost:5000/api/job-application");
      const data = await response.json();
      setJobs(data.jobs); // Assuming the response contains a "jobs" array
    };

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
        </Routes>
      </div>
    </Router>
  );
}


export default App;
