import React, { useContext, useState } from "react";
import userContext from "../utils/userContext";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// TODO: make it look like Merve's 'delete' and 'watch' buttons

// TODO: how do I refresh the movie log info on the page once item has been deleted?

const AddToLogComponent = ({ movie, director, topCast }) => {
    const { userInfo, databaseCall } = useContext(userContext);
    const logUrl = "http://localhost:8080/log/save";

    // TODO: how to pass user rating value into movieDataPOST?
    // TODO: get rid of hard-coded user rating

    const movieDataPOST = {
        userId: userInfo.id,
        movie: {
          id: movie.id,
          title: movie.title,
          year: movie.year,
          description: movie.description,
          director: movie.director,
          cast: movie.cast,
          rating: movie.rating,
          poster: movie.poster
        },
        userRating: 5
      };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addToLog = () => {
        databaseCall.post(logUrl, movieDataPOST)
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
                Log and Rate
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title" align="left">
                {"Log Movie"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" align="left">
                    Rate {movie.title}
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                <Rating name="read-only" value="5" readOnly />
            </DialogContent>
            <DialogActions>
                <Button onClick={addToLog}>Add to Log</Button>
                <Button onClick={handleClose} autoFocus>
                    Cancel
                </Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AddToLogComponent;
