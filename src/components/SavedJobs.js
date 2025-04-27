import "../index.css";

function SavedJobs({ savedJobs, handleRemoveSavedJob }) {
  return (
    <div className="saved-jobs">
      <h2>Saved Jobs</h2>
      <ul>
        {savedJobs.map((job) => (
          <li key={job._id} className="saved-job-item">
            <span>{job.title} at {job.company}</span>
            <button onClick={() => handleRemoveSavedJob(job)} className="remove-button">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedJobs;