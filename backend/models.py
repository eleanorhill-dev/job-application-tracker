from flask_sqlalchemy import SQLAlchemy  # type: ignore
from datetime import datetime

db = SQLAlchemy()

class JobApplication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100), nullable=False)
    job_title = db.Column(db.String(100), nullable=False)
    salary = db.Column(db.String(50))
    location = db.Column(db.String(100))
    application_date = db.Column(db.Date, default=datetime.utcnow)
    application_status = db.Column(db.String(50), default="Applied")  # Applied, Interview, Offer, Rejected, Withdrawn
    job_type = db.Column(db.String(50))  # Full-time, Part-time, Internship, etc.
    job_source = db.Column(db.String(100))  # LinkedIn, company website, referral, etc.
    application_deadline = db.Column(db.Date, nullable=True)
    contact_person = db.Column(db.String(100))
    contact_email = db.Column(db.String(100))
    application_link = db.Column(db.String(255))
    resume_used = db.Column(db.String(100))
    cover_letter_used = db.Column(db.String(100))
    notes = db.Column(db.Text)
    interview_date = db.Column(db.Date, nullable=True)
    follow_up_date = db.Column(db.Date, nullable=True)
    job_description = db.Column(db.Text)
    technologies_required = db.Column(db.String(255))
    offer_details = db.Column(db.Text)

    def to_dict(self):
        return {
            "id": self.id,
            "company_name": self.company_name,
            "job_title": self.job_title,
            "salary": self.salary,
            "location": self.location,
            "application_date": self.application_date,
            "application_status": self.application_status,
            "job_type": self.job_type,
            "job_source": self.job_source,
            "application_deadline": self.application_deadline,
            "contact_person": self.contact_person,
            "contact_email": self.contact_email,
            "application_link": self.application_link,
            "resume_used": self.resume_used,
            "cover_letter_used": self.cover_letter_used,
            "notes": self.notes,
            "interview_date": self.interview_date,
            "follow_up_date": self.follow_up_date,
            "job_description": self.job_description,
            "technologies_required": self.technologies_required,
            "offer_details": self.offer_details
        }