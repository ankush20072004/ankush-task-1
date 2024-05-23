import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import SubmissionDetails from "./SubmissionDetails";
import "./App.css";

function App() {
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    mobile: "",
    country: "",
    city: "",
    aadhar: "",
    pan: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // List of countries and cities
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "India",
  ];
  const cities = {
    "United States": ["New York", "Los Angeles", "Chicago"],
    Canada: ["Toronto", "Vancouver", "Montreal"],
    "United Kingdom": ["London", "Manchester", "Birmingham"],
    Australia: ["Sydney", "Melbourne", "Brisbane"],
    Germany: ["Berlin", "Munich", "Frankfurt"],
    France: ["Paris", "Lyon", "Marseille"],
    India: ["Mumbai", "Delhi", "Bangalore"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // Reset city if country changes
    if (name === "country") {
      setFormValues({ ...formValues, country: value, city: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      navigate("/submission-details", { state: { formValues } });
    }
  }, [formErrors]);

  useEffect(() => {
    if (location.pathname === "/") {
      setFormValues(initialValues);
      setIsSubmit(false);
    }
  }, [location]);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const mobilePattern = /^\d{1,10}$/;
    const aadharPattern = /^[2-9][0-9]{3}[0-9]{4}[0-9]{4}$/;
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!values.firstname) {
      errors.firstname = "First name is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Last name is required!";
    }
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.mobile) {
      errors.mobile = "Mobile No is required";
    } else if (!mobilePattern.test(values.mobile)) {
      errors.mobile = "Mobile no is incorrect";
    }
    if (!values.country) {
      errors.country = "Country is required";
    }
    if (!values.city) {
      errors.city = "City is required";
    }
    if (!values.aadhar) {
      errors.aadhar = "Aadhaar number is required";
    } else if (!aadharPattern.test(values.aadhar)) {
      errors.aadhar =
        "Aadhaar number must be exactly 12 digits and start with a digit between 2 and 9";
    }
    if (!values.pan) {
      errors.pan = "PAN is required";
    } else if (!panPattern.test(values.pan)) {
      errors.pan = "PAN is not in valid format";
    }
    return errors;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
              <div className="ui message success">Signed in successfully</div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <h1>Registration Form</h1>
              <div className="ui divider"></div>
              <div className="ui form">
                <div className="field">
                  <label>First Name</label>
                  <p></p>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={formValues.firstname}
                    onChange={handleChange}
                  />
                </div>
                <p>{formErrors.firstname}</p>
                <div className="field">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formValues.lastname}
                    onChange={handleChange}
                  />
                </div>
                <p>{formErrors.lastname}</p>
                <div className="field">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formValues.username}
                    onChange={handleChange}
                  />
                </div>
                <p>{formErrors.username}</p>
                <div className="field">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </div>
                <p>{formErrors.email}</p>
                <div className="field">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                </div>
                <p>{formErrors.password}</p>
                <div className="field">
                  <label>Mobile No</label>
                  <input
                    type="mobile"
                    name="mobile"
                    placeholder="Mobile No"
                    value={formValues.mobile}
                    onChange={handleChange}
                  />
                </div>
                <p>{formErrors.mobile}</p>
                <div className="field">
                  <label>Country</label>
                  <select
                    name="country"
                    value={formValues.country}
                    onChange={handleChange}
                    className="ui dropdown"
                  >
                    <option value="" disabled>
                      Select Your Country
                    </option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <p>{formErrors.country}</p>
                {formValues.country && (
                  <div className="field">
                    <label>City</label>
                    <select
                      name="city"
                      value={formValues.city}
                      onChange={handleChange}
                      className="ui dropdown"
                    >
                      <option value="" disabled>
                        Select Your City
                      </option>
                      {cities[formValues.country].map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <p>{formErrors.city}</p>
                <div className="field">
                  <label>Aadhaar Number</label>
                  <input
                    type="text"
                    name="aadhar"
                    placeholder="Aadhaar Number"
                    value={formValues.aadhar}
                    onChange={handleChange}
                  />
                </div>
                <p>{formErrors.aadhar}</p>
                <div className="field">
                  <label>PAN No </label>
                  <input
                    type="text"
                    name="pan"
                    placeholder="PAN Number"
                    value={formValues.pan}
                    onChange={handleChange}
                  />
                </div>
                <p>{formErrors.pan}</p>

                <button className="fluid ui button blue">Submit</button>
              </div>
            </form>
          </div>
        }
      />
      <Route path="/submission-details" element={<SubmissionDetails />} />
    </Routes>
  );
}

export default App;
