import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateApplication = ({ updateJob }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({
    company_name: '',
    job_title: '',
    salary: '',
    location: '',
    application_status: '',
    job_type: '',
    job_source: '',
    application_deadline: '',
    contact_person: '',
    contact_email: '',
    application_link: '',
    resume_used: '',
    cover_letter_used: '',
    notes: '',
    interview_date: '',
    follow_up_date: '',
    job_description: '',
    technologies_required: '',
    offer_details: ''
  });

  useEffect(() => {
    const fetchJobDetails = async () => {
      const response = await fetch(`http://localhost:5000/api/job-application/${id}`);
      const data = await response.json();
      if (response.ok) {
        setJobDetails(data.job);
      } else {
        alert("Job application not found.");
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateJob(id, jobDetails);
    navigate("/"); 
  };

  return (
    <div>
      <h2>Update Job Application</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(jobDetails).map((field) => (
          <label key={field}>
            {field.replace(/_/g, ' ').toUpperCase()}:
            <input
              type="text"
              name={field}
              value={jobDetails[field]}
              onChange={handleChange}
            />
          </label>
        ))}
        <button type="submit">Update Application</button>
      </form>
    </div>
  );
};

export default UpdateApplication;
