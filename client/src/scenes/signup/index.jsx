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
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    id: "",
    kra: "",
    password: "",
    county: "",
    role: "",
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
    console.log("submit")

    const errors = {
      name: validator.isEmpty(formValues.name),
      phoneNumber: !validator.isMobilePhone(formValues.phoneNumber),
      email: !validator.isEmail(formValues.email),
      id: !validator.isNumeric(formValues.id),
      kra: validator.isEmpty(formValues.kra),
      password: validator.isEmpty(formValues.password),
      // county: validator.isEmpty(formValues.county),
      // role: validator.isEmpty(formValues.role),
    };

    setFormErrors(errors);

    if (!Object.values(errors).some(Boolean)) {
      console.log("Form submitted successfully:", formValues);
      navigate("/otp");
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "0 auto", mt: 5, p: 3 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          error={formErrors.name}
          helperText={formErrors.name && "Please enter your name"}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          label="Phone Number"
          name="phoneNumber"
          value={formValues.phoneNumber}
          onChange={handleChange}
          error={formErrors.phoneNumber}
          helperText={
            formErrors.phoneNumber && "Please enter a valid phone number"
          }
        />
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
          label="ID"
          name="id"
          type="number"
          value={formValues.id}
          onChange={handleChange}
          error={formErrors.id}
          helperText={formErrors.id && "Please enter a valid ID number"}
        />
        <TextField
          required
          fullWidth
          margin="normal"
          label="KRA PIN"
          name="kra"
          value={formValues.kra}
          onChange={handleChange}
          error={formErrors.kra}
          helperText={formErrors.kra && "Please enter your KRA PIN"}
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
          Already have an account? <a href="/login">Log in</a>
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
          Sign Up
        </Button>

      </form>
    </Card>
  )
}

export default SignUpForm

