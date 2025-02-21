from flask import Flask, request, jsonify  # type: ignore
from models import db, JobApplication  # Import db and the JobApplication model
from datetime import datetime
from flask_cors import CORS  # type: ignore

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Database Configuration (SQLite for simplicity)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///job_tracker.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# Create tables before running the app
with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return "Job Application Tracker API is running!"


@app.route("/api/job-application", methods=["POST"])
def add_job_application():
    data = request.get_json()  # Get data from the request

    # Create a new job application instance
    new_job = JobApplication(
        company_name=data["company_name"],
        job_title=data["job_title"],
        salary=data.get("salary"),
        location=data.get("location"),
        application_date=datetime.strptime(data["application_date"], '%Y-%m-%dT%H:%M:%S.%fZ') if data.get("application_date") else datetime.utcnow(),
        application_status=data.get("application_status", "Applied"),
        job_type=data.get("job_type"),
        job_source=data.get("job_source"),
        application_deadline=datetime.strptime(data["application_deadline"], '%Y-%m-%d') if data.get("application_deadline") else None,
        contact_person=data.get("contact_person"),
        contact_email=data.get("contact_email"),
        application_link=data.get("application_link"),
        resume_used=data.get("resume_used"),
        cover_letter_used=data.get("cover_letter_used"),
        notes=data.get("notes"),
        interview_date=datetime.strptime(data["interview_date"], '%Y-%m-%d') if data.get("interview_date") else None,
        follow_up_date=datetime.strptime(data["follow_up_date"], '%Y-%m-%d') if data.get("follow_up_date") else None,
        job_description=data.get("job_description"),
        technologies_required=data.get("technologies_required"),
        offer_details=data.get("offer_details")
    )

    db.session.add(new_job)
    db.session.commit()

    return jsonify({"message": "Job application added successfully!", "job": new_job.to_dict()}), 201


@app.route('/api/job-application', methods=['GET'])
def get_job_applications():
    job_applications = JobApplication.query.all()
    jobs_list = [job.to_dict() for job in job_applications]
    return jsonify({'jobs': jobs_list})

"""
@app.route('/api/job-applications', methods=['GET'])
def get_job_applications():
    job_applications = JobApplication.query.all()  # Get all job applications
    job_list = [{
        "id": job.id,
        "company_name": job.company_name,
        "job_title": job.job_title,
        "salary": job.salary,
        "location": job.location,
        "application_status": job.application_status,
        "job_type": job.job_type,  
        "job_source": job.job_source,
        "application_deadline": job.application_deadline,
        "contact_person": job.contact_person,
        "contact_email": job.contact_email, 
        "application_link": job.application_link,
        "resume_used": job.resume_used, 
        "cover_letter_used": job.cover_letter_used,
        "notes": job.notes,
        "interview_date": job.interview_date,
        "follow_up_date": job.follow_up_date,
        "job_description": job.job_description, 
        "technologies_required": job.technologies_required,
        "offer_details": job.offer_details
    } for job in job_applications]
    return jsonify(job_list)
"""


@app.route("/api/job-application/<int:id>", methods=["PUT"])
def update_job_application(id):
    data = request.get_json()  # Get data from the request
    job = JobApplication.query.get(id)

    if not job:
        return jsonify({"message": "Job application not found"}), 404

    # Update job application attributes
    job.company_name = data.get("company_name", job.company_name)
    job.job_title = data.get("job_title", job.job_title)
    job.salary = data.get("salary", job.salary)
    job.location = data.get("location", job.location)
    job.application_status = data.get("application_status", job.application_status)
    job.job_type = data.get("job_type", job.job_type)
    job.job_source = data.get("job_source", job.job_source)
    job.application_deadline = datetime.strptime(data["application_deadline"], '%Y-%m-%d') if data.get("application_deadline") else job.application_deadline
    job.contact_person = data.get("contact_person", job.contact_person)
    job.contact_email = data.get("contact_email", job.contact_email)
    job.application_link = data.get("application_link", job.application_link)
    job.resume_used = data.get("resume_used", job.resume_used)
    job.cover_letter_used = data.get("cover_letter_used", job.cover_letter_used)
    job.notes = data.get("notes", job.notes)
    job.interview_date = datetime.strptime(data["interview_date"], '%Y-%m-%d') if data.get("interview_date") else job.interview_date
    job.follow_up_date = datetime.strptime(data["follow_up_date"], '%Y-%m-%d') if data.get("follow_up_date") else job.follow_up_date
    job.job_description = data.get("job_description", job.job_description)
    job.technologies_required = data.get("technologies_required", job.technologies_required)
    job.offer_details = data.get("offer_details", job.offer_details)

    db.session.commit()

    return jsonify({"message": "Job application updated successfully!", "job": job.to_dict()}), 200


@app.route("/api/job-application/<int:id>", methods=["DELETE"])
def delete_job_application(id):
    job = JobApplication.query.get(id)

    if not job:
        return jsonify({"message": "Job application not found"}), 404

    db.session.delete(job)
    db.session.commit()

    return jsonify({"message": "Job application deleted successfully!"}), 200




if __name__ == "__main__":
    app.run(debug=True)
