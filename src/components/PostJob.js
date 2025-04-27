import { useState } from "react";

import apiJobClient from "../api/apiJobClient";

import "../index.css";

function PostJob({ onPostJob }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onPostJob({
      id: Date.now(),
      title,
      company,
      description,
    });
    setTitle("");
    setCompany("");
    setDescription("");
  };

  return (
    <div className="job-tinder-container">
      <h1>Post a Job</h1>
      <form className="post-job-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}

export default PostJob;