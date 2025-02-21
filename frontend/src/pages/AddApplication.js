import React, { useState } from 'react';

const AddApplication = () => {
    const [jobData, setJobData] = useState({
        company_name: '',
        job_title: '',
        salary: '',
        location: '',
        application_date: '',
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

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({
            ...jobData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/job-application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jobData)
            });

            if (response.ok) {
                alert('Job application added successfully!');
            } else {
                alert('Error adding job application!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding job application!');
        }
    };

    return (
        <div>
            <h2>Add Job Application</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Company Name:
                    <input
                        type="text"
                        name="company_name"
                        value={jobData.company_name}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Job Title:
                    <input
                        type="text"
                        name="job_title"
                        value={jobData.job_title}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Salary:
                    <input
                        type="text"
                        name="salary"
                        value={jobData.salary}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={jobData.location}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Application Date:
                    <input
                        type="date"
                        name="application_date"
                        value={jobData.application_date}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Application Status:
                    <input
                        type="text"
                        name="application_status"
                        value={jobData.application_status}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Job Type:
                    <input
                        type="text"
                        name="job_type"
                        value={jobData.job_type}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Job Source:
                    <input
                        type="text"
                        name="job_source"
                        value={jobData.job_source}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Application Deadline:
                    <input
                        type="date"
                        name="application_deadline"
                        value={jobData.application_deadline}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Contact Person:
                    <input
                        type="text"
                        name="contact_person"
                        value={jobData.contact_person}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Contact Email:
                    <input
                        type="email"
                        name="contact_email"
                        value={jobData.contact_email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Application Link:
                    <input
                        type="text"
                        name="application_link"
                        value={jobData.application_link}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Resume Used:
                    <input
                        type="text"
                        name="resume_used"
                        value={jobData.resume_used}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Cover Letter Used:
                    <input
                        type="text"
                        name="cover_letter_used"
                        value={jobData.cover_letter_used}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Notes:
                    <textarea
                        name="notes"
                        value={jobData.notes}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Interview Date:
                    <input
                        type="date"
                        name="interview_date"
                        value={jobData.interview_date}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Follow Up Date:
                    <input
                        type="date"
                        name="follow_up_date"
                        value={jobData.follow_up_date}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Job Description:
                    <textarea
                        name="job_description"
                        value={jobData.job_description}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Technologies Required:
                    <input
                        type="text"
                        name="technologies_required"
                        value={jobData.technologies_required}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Offer Details:
                    <textarea
                        name="offer_details"
                        value={jobData.offer_details}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Add Application</button>
            </form>
        </div>
    );
};

export default AddApplication;
