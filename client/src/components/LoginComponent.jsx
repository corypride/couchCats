import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginComponent() {
 //FROM ERIN: Added a state variable for success message that we can use to set and display a message when registration is successful
 const [failMessage, setFailMessage] = useState(null);

  const initialLoginValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const onSubmit = (values, props) => {
    console.log(values);
    console.log(props)
    setTimeout(()=>{

      props.resetForm()
      props.setSubmitting(false)
    },2000)

    const loginUrl = "http://localhost:8080/user/login";
    const {...user} = initialLoginValues

    const headersObj = {
      "Content-Type": "application/json"
      }

      axios.post(loginUrl, values, { headers: headersObj })
      .then((response) => {
        console.log("response from backend => ", response);
        //TODO redirect to profile page instead of home (once ready)
        navigate('/');
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
      } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error message:", error.message);
      }
    });

  //  axios.post("http://localhost:8080/user/login",
  //   { email: "newemail2@gmail.com",
  //   password: "Testing54321*"},{headers:headersObj}).then((response) => {
  //     console.log("response from backend=> ", response)
  //   }).catch((error) => {
  //     console.error("error while backend calling ", error)
  //   })
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
  });
      

  return (
    <Formik initialValues={initialLoginValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
            padding={2} 
            textAlign={"center"}
            >
            Login!
            </Typography>
            {/* FROM ERIN: Displays fail message if/when it exists to let the user know why their login didn't work */}
          {failMessage && (
            <Typography variant="body1" color="primary" sx={{ marginTop: "1rem" }}>
              {failMessage}
            </Typography>
          )}
            <Field
              as={TextField}
              margin="normal"
              type="email"
              variant="standard"
              placeholder="Email"
              color="secondary"
              fullWidth
              name="email" 
              helperText={<ErrorMessage name="email" component="div"/>}
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
              helperText={<ErrorMessage name="password" component="div"/>}
            />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "1.5rem" }}
            disable={props.isSubmitting}
            >{props.isSubmitting?"Loading":"Login"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default LoginComponent;
