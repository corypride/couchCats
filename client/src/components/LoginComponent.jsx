import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'; 
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import userContext from "../utils/userContext";

const LoginComponent = () => {
    const [failMessage, setFailMessage] = useState(null);
    const { setUserInfo } = useContext(userContext)

    const initialLoginValues = {
        email: "",
        password: "",
    };

    const headersObj = {
        "Content-Type": "application/json",
    };

    const navigate = useNavigate();

    const onSubmit = (values, props) => {
        console.log(values);
        console.log(props);
        setTimeout(() => {
            props.resetForm();
            props.setSubmitting(false);
        }, 2000);

        const loginUrl = "http://localhost:8080/user/login";
        const { ...user } = initialLoginValues;

        axios.post(loginUrl, values, { headers: headersObj, withCredentials: true })
            .then((response) => {
                console.log("response from backend => ", response);
                setUserInfo({
                    isAuthenticated: true,
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email
                });
                navigate('/profile');
            })
            .catch((error) => {
                console.error("error while backend calling ", error);

                if (error.response) {
                    // The request was made, server responded with a status code outside of 2xx
                    console.log("Error data:", error.response.data);
                    console.log("Error status:", error.response.status);
                    console.log("Error headers:", error.response.headers);

                    // Display the error message to the user, in this case, invalid credentials
                    setFailMessage(error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log("Error request:", error.request);
                    setFailMessage("Login failed: Something went wrong, please try again");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error message:", error.message);
                    setFailMessage("Login failed: Something went wrong, please try again");
                } 
            });
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
                        boxShadow={"5px 5px 10px #d993ab"}
                        sx={{
                            hover: {
                                boxShadow: "10px 10px 20px #d993ab",
                            },
                        }}
                    >
                        <Typography
                            variant="h4"
                            color="primary"
                            padding={2}
                            textAlign={"center"}
                        >
                           Welcome back to CouchCat
                        </Typography>
                        {/* Displays fail message if/when it exists to let the user know why their login didn't work */}
                        {failMessage && (
                            <Typography 
                            variant="standard" 
                            color="attention.main" 
                            sx={{ marginTop: "1rem" }}>
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
                            helperText={<ErrorMessage name="email" component="span" />}
                            sx={{ 
                                padding: "1rem",
                                backgroundColor: "#d3d3d3",
                                borderRadius: 2, 
                                borderColor: "accent.main", 
                                hover: {
                                borderColor: "primary.dark", 
                                },
                            }} 
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
                            helperText={<ErrorMessage name="password" component="span" />}
                            sx={{ 
                                padding: "1rem",
                                backgroundColor: "#d3d3d3",
                                borderRadius: 2, // Set border radius
                                borderColor: "accent.main", // Set border color
                                hover: {
                                borderColor: "primary.dark", // Set border color on hover
                                },
                            }} 
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: "1.5rem" }}
                            disabled={props.isSubmitting}
                        >{props.isSubmitting ? "Loading" : "Login"}
                        </Button>
                        <Typography
                            variant="standard"
                            color="primary"
                            sx={{ marginTop: "0.5rem" }}
                            padding={2}
                            textAlign={"center"}
                        >
                            Don't have an account?  <a href='/register'>Join now</a>
                        </Typography>
                    </Box>
                </Form>
            )}
        </Formik>
    );
    }

export default LoginComponent;
