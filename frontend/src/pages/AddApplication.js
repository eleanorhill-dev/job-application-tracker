function AddApplication(){
    return (
        <div>
            <h2>Add a Job Application</h2>
            <p>Enter job details below:</p>
            <form>
                <label>Company Name:</label>
                <input type="text" />
                <br />
                <label>Job Title:</label>
                <input type="text" />
                <br />
                <label>Salary:</label>
                <input type="text" />
                <br />
                <label>Location:</label>
                <input type="text" />
                <br />
                <button type="submit">Save Application</button>
            </form>
        </div>
    );
}


export default AddApplication;