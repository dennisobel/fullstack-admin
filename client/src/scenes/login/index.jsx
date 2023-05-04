import React, { useState } from "react";
import {
  TextField,
  Card,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "state";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    phoneNumber: false,
    email: false,
    id: false,
    kra: false,
    password: false,
    county: false,
    role: false,
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
      email: !validator.isEmail(formValues.email),
      password: validator.isEmpty(formValues.password),
    };

    setFormErrors(errors);

    if (!Object.values(errors).some(Boolean)) {
      console.log("Form submitted successfully:", formValues);
      dispatch(setIsAuthenticated())
      navigate("/dashboard")
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "0 auto", mt: 5, p: 3 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          error={formErrors.email}
          helperText={formErrors.email && "Please enter a valid email address"}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          error={formErrors.password}
          helperText={formErrors.kra && "Please enter your password"}
        />
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          You don't have an account? <a href="/">Sign Up</a>
        </p>

        <Button
          variant="contained"
          type="submit"
          sx={{
            marginTop: 4,
            paddingX: 4,
            paddingY: 2,
            borderRadius: 2,
            boxShadow: "none",
            backgroundColor: "teal",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#0039cb",
              boxShadow: "none",
            },
          }}
        >
          Login
        </Button>

      </form>
    </Card>
  )
}

export default LoginForm

