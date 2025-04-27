import TinderCard from "react-tinder-card";
import "../index.css";

function FindJobs({ jobs, handleSwipe, handleCardLeftScreen, handleNope, handleSave }) {

  return (
    <div className="job-tinder-container">
      <h1>Find Jobs</h1>
      <div className="card-container">
        {jobs && jobs.map((job, index) => (
          <TinderCard
            key={job._id}
            onSwipe={(dir) => handleSwipe(dir, job)}
            onCardLeftScreen={() => handleCardLeftScreen(job._id)}
            preventSwipe={["up", "down", "left", "right"]} 
          >
            <div
              className="job-card"
              style={{ zIndex: jobs.length - index }}
            >
              <h2>{job.title}</h2>
              <h4>{job.company}</h4>
              <p>{job.description}</p>

              <div className="action-buttons">
                <button onClick={() => handleNope(job)} className="nope-button">NOPE</button>
                <button onClick={() => handleSave(job)} className="save-button">SAVE</button>
              </div>
            </div>
          </TinderCard>
        ))}
        {jobs.length === 0 && <p>No more jobs.</p>}
      </div>
    </div>
  );
}

export default FindJobs;