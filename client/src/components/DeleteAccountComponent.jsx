import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

// TODO after implementing Redux: do I also need to update user context or headersObj through UserManagement?

const DeleteAccountComponent = ({ headersObj }) => {
    const deleteUrl = "http://localhost:8080/user";
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

  const handleClose = () => {
    setOpen(false);
  };

    const deleteAccount = () => {
        //include the withCredentials: true to ensure that the Cookie is passed with the headers if present
        console.log("Headers Object: ", headersObj);
        axios.delete(deleteUrl, { headers: headersObj, withCredentials: true })
            .then((response) => {
                console.log("Response from back end: ", response);
                navigate('/');
            })
            .catch((error) => {
                console.error("Error while calling end: ", error);
            });
            handleClose();
    };

    return (
        <React.Fragment>
            <Button
            //calls function above on button click
            onClick={handleClickOpen}
            variant="contained"
            color="secondary"
            sx={{ 
                width: "5rem", 
                padding: "0",
                color: "primary",
                "&:hover": {
                    backgroundColor: "#D92F2F",
                    color: "white"
                }
            }}
            >
                <Typography sx={{ fontSize: "0.75rem"}}>Delete Account</Typography>
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title" align="left">
                {"Are you sure you want to delete your account?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" align="left">
                    All data associated with your account will be deleted. This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={deleteAccount}>Delete Account</Button>
                <Button onClick={handleClose} autoFocus>
                    Cancel
                </Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DeleteAccountComponent;
