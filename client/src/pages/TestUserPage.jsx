import React from 'react';
import { Typography } from "@mui/material";
import TestUserComponent from '../components/TestUserComponent';

export default function TestUserPage() {
  return (
    <div>
        <TestUserComponent />
        <Typography 
                component="h2"
                sx={{
                    fontSize: "1.5rem",
                    marginTop: "0",
                    marginBottom: "1rem"
                }}
                >Test user page</Typography>
    </div>
  )
}