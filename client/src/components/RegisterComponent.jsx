import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function RegisterComponent() {
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
        "Password must contain at least one number and one special character"
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
            <Field
              as={TextField}
              margin="normal"
              type={"text"}
              variant="standard"
              placeholder="First Name"
              color="primary"
              fullWidth
              name="firstName"  
              helperText={<ErrorMessage name="firstName" component="div"/>}
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
              helperText={<ErrorMessage name="lastName" component="div"/>}
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
              helperText={<ErrorMessage name="email" component="div"/>}

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
              helperText={<ErrorMessage name="emailConfirmation" component="div"/>}

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
            <Field
              as={TextField}
              margin="normal"
              type="password"
              variant="standard"
              placeholder="Password Confirmation"
              color="secondary"
              fullWidth
              name="passwordConfirmation"
              helperText={<ErrorMessage name="passwordConfirmation" component="div"/>}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: "1.5rem" }}
              disable={props.isSubmitting}
            >{props.isSubmitting?"Loading":"Register"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterComponent;
