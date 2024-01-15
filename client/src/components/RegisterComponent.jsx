import { useNavigate } from 'react-router-dom'; 
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function RegisterComponent() {
  const [failMessage, setFailMessage] = useState(null);
  const navigate = useNavigate();


  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    emailConfirmation: "",
    password: "",
    passwordConfirmation: "",
  };

  const onSubmit = (values, props) => {
    console.log(values);
    console.log(props)
    setTimeout(()=>{

      props.resetForm()
      props.setSubmitting(false)
    },2000)

    const registerUrl = "http://localhost:8080/user/register";
    const {emailConfirmation, passwordConfirmation, ...user} = initialValues // decunstraction of the intialValues object the 

    
    const headersObj = {
    "Content-Type": "application/json"
    }
    
    axios.post(registerUrl, values, { headers: headersObj })
  .then((response) => {
    console.log("response from backend => ", response);

        //redirects to login page
        navigate('/login');;
  })
  .catch((error) => {
    console.error("error while backend calling ", error);

    // Note from Erin: Added this code to handle the HTTP Response that the server sends
    if (error.response) {
      //The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("Error data:", error.response.data);
      console.log("Error status:", error.response.status);
      console.log("Error headers:", error.response.headers);

      // Display the error message to the user
      setFailMessage(error.response.data);
  } else if (error.request) {
      // The request was made but no response was received
      console.log("Error request:", error.request);
      setFailMessage("Registration Failed: Something went wrong, please try again");
  } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error message:", error.message);
      setFailMessage("Registration Failed: Something went wrong, please try again");
  }
});
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    emailConfirmation: Yup.string()
      .oneOf([Yup.ref("email")], "Emails must match")
      .required("Email Confirmation is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be at most 64 characters")
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least one number and one special character. Special characters allowed are: !, @, #, $, %, ^, &, *."
      ),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Password Confirmation is required"),
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(props) => (
        <Form>
          <Box
            display="flex"
            flexDirection={"column"}
            maxWidth={400}
            alignItems="center"
            justifyContent={"center"}
            margin="auto"
            marginTop={5}
            padding={3}
            borderRadius={5}
            boxShadow={"5px 5px 10px #d3d3d3"}
            bgcolor="box.main"
            sx={{
              hover: {
                boxShadow: "10px 10px 20px #d3d3d3",
              },
            }}
          >
            <Typography
              variant="h3"
              color="primary"
              padding={2}
              textAlign={"center"}
            >
              Register!
            </Typography>
              {/* Displays fail message if/when it exists to let the user know why registration didn't work */}
              {failMessage && 
                (<Typography 
                variant="standard" 
                color="attention.main" 
                sx={{ marginTop: "1rem" }}
                > 
                  {failMessage}
                </Typography>
              )}
            <Field
              as={TextField}
              margin="normal"
              type={"text"}
              variant="standard"
              placeholder="First Name"
              color="primary"
              fullWidth
              name="firstName"  
              helperText={<ErrorMessage name="firstName" component="span"/>}
              />
            <Field
              as={TextField}
              margin="normal"
              type={"text"}
              variant="standard"
              placeholder="Last Name"
              color="secondary"
              fullWidth
              name="lastName"
              helperText={<ErrorMessage name="lastName" component="span"/>}
            />
            <Field
              as={TextField}
              margin="normal"
              type="email"
              variant="standard"
              placeholder="Email"
              color="secondary"
              fullWidth
              name="email" 
              helperText={<ErrorMessage name="email" component="span"/>}

            />
            <Field
              as={TextField}
              margin="normal"
              type="email"
              variant="standard"
              placeholder="Email Confirmation"
              color="secondary"
              fullWidth
              name="emailConfirmation"
              helperText={<ErrorMessage name="emailConfirmation" component="span"/>}

            />
            <Field
              as={TextField}
              margin="normal"
              type="password"
              variant="standard"
              placeholder="Password"
              color="secondary"
              fullWidth
              name="password"
              helperText={<ErrorMessage name="password" component="span"/>}
            />
            <Field
              as={TextField}
              margin="normal"
              type="password"
              variant="standard"
              placeholder="Password Confirmation"
              color="secondary"
              fullWidth
              name="passwordConfirmation"
              helperText={<ErrorMessage name="passwordConfirmation" component="span"/>}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: "1.5rem" }}
              disabled={props.isSubmitting}
            >{props.isSubmitting? "Loading" : "Register"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterComponent;