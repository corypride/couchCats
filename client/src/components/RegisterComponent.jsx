import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

function RegisterComponent() {
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
          <Typography variant="h3" color='secondary' padding={2} textAlign={"center"}>
            Register!
          </Typography>
          <TextField
            margin="normal"
            type={"text"}
            variant="standard"
            placeholder="Full Name"
            color='secondary'
          />
          <TextField
            margin="normal"
            type={"email"}
            variant="standard"
            placeholder="Email"
            color='secondary'
          />
          <TextField
            margin="normal"
            type={"email"}
            variant="standard"
            placeholder="Email Confirmation"
            color='secondary'
          />
          <TextField
            margin="normal"
            type={"password"}
            variant="standard"
            placeholder="Password"
            color='secondary'
          />
          <TextField
            margin="normal"
            type={"password"}
            variant="standard"
            placeholder="Password Confirmation"
            color='secondary'
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: "1.5rem" }}
          >
            Register
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default RegisterComponent;
