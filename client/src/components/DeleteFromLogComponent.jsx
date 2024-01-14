import React, { useContext, useState } from "react";
import userContext from "../utils/userContext";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// TODO make it look like Merve's 'delete' button

const DeleteFromLogComponent = ({ movie }) => {
    const { userInfo, databaseCall } = useContext(userContext);
    const deleteUrl = "http://localhost:8080/log";

    const deletePayload = {
        userId: userInfo.id,
        movieId: movie.id
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
                handleClose();
            })
            .catch((error) => {
                console.error("Error while calling back end: ", error);
                // TODO: display error message to user? can I display this in the dialog?
                handleClose();
            });
    };

    return (
        <React.Fragment>
            <Button
            size="small"
            onClick={handleClickOpen}
            variant="contained"
            color="attention"
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
                <DialogContentText id="alert-dialog-description" align="left">
                    {movie.title} will be permanently deleted from your log.
                </DialogContentText>
            </DialogContent>
            <DialogContent>
            </DialogContent>
            <DialogActions>
                <Button onClick={deleteFromLog}>Delete</Button>
                <Button onClick={handleClose} autoFocus>
                    Cancel
                </Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DeleteFromLogComponent;
