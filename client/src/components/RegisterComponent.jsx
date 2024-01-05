import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

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

    const registerUrl = "http://localhost:8080/user/register";
    const {emailConfirmation, passwordConfirmation, ...user} = initialValues
    
    const headersObj = {
    "Content-Type": "application/json"
    }
    
    axios.post("http://localhost:8080/user/register",
    { firstName: "testing",
    lastName: "somemore",
    email: "test12@gmail.com",
    password: "testing54321*"},{headers:headersObj}).then((response) => {
      console.log("response from backend=> ", response)
    }).catch((error) => {
      console.error("error while backend calling ", error)
    })
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

