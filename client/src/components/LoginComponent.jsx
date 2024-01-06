import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

//TODO: update login to handle post so I can test to make sure front end/back end API works
function LoginComponent() {
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
