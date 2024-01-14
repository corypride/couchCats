import React, { useContext, useState } from "react";
import userContext from "../utils/userContext";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// TODO make it look like Merve's 'delete' button

const DeleteFromLogComponent = ({ movieId }) => {
    const { userInfo, databaseCall } = useContext(userContext);
    const deleteUrl = "http://localhost:8080/log";

    const deletePayload = {
        userId: userInfo.id,
        movieId: movieId
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteFromLog = () => {
        databaseCall.delete(deleteUrl, {
            data: deletePayload
          })
            .then((response) => {
                console.log("Response from back end: ", response);
            })
            .catch((error) => {
                console.error("Error while calling back end: ", error);
            });
    };

    return (
        <React.Fragment>
            <Button
            //calls function above on button click
            onClick={handleClickOpen}
            variant="contained"
            color="error"
            >
                Delete
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title" align="left">
                {"Are you sure?"}
            </DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
                <Button onClick={deleteFromLog}>Delete from log</Button>
                <Button onClick={handleClose} autoFocus>
                    Cancel
                </Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DeleteFromLogComponent;
