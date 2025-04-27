import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

import FindJobs from "./components/FindJobs";
import SavedJobs from "./components/SavedJobs";
import PostJob from "./components/PostJob";
import Header from "./components/Header";
import Footer from "./components/Footer";

import apiJobClient from "./api/apiJobClient";

import "./index.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
  }, []);

  async function fetchJobs() {
    try {
      const response = await apiJobClient.get('/jobs');
      console.log('Jobs loaded:', response.data);
      setJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch jobs', error);
    }
  }

  async function fetchSavedJobs() {
    try {
      const response = await apiJobClient.get('/saved-jobs');
      console.log('Saved Jobs loaded:', response.data);
      setSavedJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch saved jobs', error);
    }
  }

  const handleRemoveSavedJob = async (jobToRemove) => {
    try {
      const resp = await apiJobClient.delete(`/saved-jobs/${jobToRemove._id}`);
      console.log(resp);
      setSavedJobs((prev) => prev.filter((job) => job._id !== jobToRemove._id));
    } catch (error) {
      console.error('Failed to delete saved job:', error);
    }
  };

  const handleSwipe = async (direction, job) => {
    console.log(direction);
    if (direction === "right" || direction === "up") {
      setSavedJobs((prev) => [...prev, job]);
    }

    try {
      await apiJobClient.delete(`/jobs/${job._id}`);
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const handleSave = async (job) => {
    setSavedJobs((prev) => [...prev, job]);
    setJobs((prevJobs) => prevJobs.filter((j) => j._id !== job._id));

    try {
      await apiJobClient.delete(`/jobs/${job._id}`);
      await apiJobClient.post('/saved-jobs', job);
    } catch (error) {
      console.error('Failed to save job:', error);
    }
  };

  const handleNope = async (job) => {
    try {
      await apiJobClient.delete(`/jobs/${job._id}`);
      setJobs((prevJobs) => prevJobs.filter((j) => j._id !== job._id));
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const handleCardLeftScreen = (jobId) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
  };

  const handlePostJob = async (newJob, navigate) => {
    const postJob = {
      title: newJob.title,
      company: newJob.company,
      description: newJob.description,
    };

    try {
      await apiJobClient.post('/jobs', postJob);
      await fetchJobs();
      navigate("/find");
    } catch (error) {
      console.error('Failed to post job:', error);
    }
  };

  return (
    <Router>
      <div>
        <Header />

        {/* Navbar */}
        <div className="navbar">
          <Link to="/find">
            <button>Find Jobs</button>
          </Link>
          <Link to="/saved">
            <button>Saved Jobs</button>
          </Link>
          <Link to="/post">
            <button>Post Job</button>
          </Link>
        </div>

        {/* Pages */}
        <div className="content">
          <Routes>
            <Route path="/" element={
              <FindJobs
                jobs={jobs}
                handleSwipe={handleSwipe}
                handleCardLeftScreen={handleCardLeftScreen}
                handleNope={handleNope}
                handleSave={handleSave}
              />
            } />
            <Route path="/find" element={
              <FindJobs
                jobs={jobs}
                handleSwipe={handleSwipe}
                handleCardLeftScreen={handleCardLeftScreen}
                handleNope={handleNope}
                handleSave={handleSave}
              />
            } />
            <Route path="/saved" element={
              <SavedJobs
                savedJobs={savedJobs}
                handleRemoveSavedJob={handleRemoveSavedJob}
              />
            } />
            <Route path="/post" element={<PostJobWrapper onPostJob={handlePostJob} />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

// Wrapper to inject navigate for PostJob
function PostJobWrapper({ onPostJob }) {
  const navigate = useNavigate();

  return <PostJob onPostJob={(newJob) => onPostJob(newJob, navigate)} />;
}

export default App;