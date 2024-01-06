import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

//TODO: update login to handle post so I can test to make sure front end/back end API works
function LoginComponent() {

  const initialLoginValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values, props) => {
    console.log(values);
    console.log(props)
    setTimeout(()=>{

      props.resetForm()
      props.setSubmitting(false)
    },2000)

    const loginUrl = "http://localhost:8080/user/login";
    const {...user} = initialValues

    const headersObj = {
      "Content-Type": "application/json"
      }


   axios.post("http://localhost:8080/user/login",
    { email: "newemail2@gmail.com",
    password: "Testing54321*"},{headers:headersObj}).then((response) => {
      console.log("response from backend=> ", response)
    }).catch((error) => {
      console.error("error while backend calling ", error)
    })
  };
      

  return (
    <div>
      <form>
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
          <Typography variant="h3" padding={2} textAlign={"center"}>
            Login!
          </Typography>
          <TextField
            margin="normal"
            type={"email"}
            variant="standard"
            placeholder="Email"
          />
          <TextField
            margin="normal"
            type={"password"}
            variant="standard"
            placeholder="Password"
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "1.5rem" }}
          >
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default LoginComponent;
