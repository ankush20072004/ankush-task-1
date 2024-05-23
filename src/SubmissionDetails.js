import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SubmissionDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formValues } = location.state || {};

  if (!formValues) {
    return <div>No submission details available.</div>;
  }

  return (
    <div className="container">
      <h1>Submission Details</h1>
      <pre>{JSON.stringify(formValues, null, 2)}</pre>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default SubmissionDetails;
