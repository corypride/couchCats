import React, { useContext, useState } from "react";
import userContext from "../utils/userContext";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddToLogComponent = ({ movie }) => {
    const { userInfo, databaseCall, setRefetchDb, refetchDb } = useContext(userContext);
    const logUrl = "http://localhost:8080/log/save";

    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    const [rating, setRating] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = () => {
        // switch boolean value of 'checked' every time switch is clicked
        if (checked) {
            setChecked(false);
        } else {
            setChecked(true);
        }
        // setChecked( checked ? false : true);
      };

    const handleDelete = async () => {
                    try {
                const dataDelete = {
                    userId: userInfo.id,
                    movieId: movie.id
                }
                const response = await databaseCall.delete('/watchlist', {
                        data: dataDelete
                    });
                const data = await response.data;
                setRefetchDb(!refetchDb)
                return data;
              } catch (error) {
                console.error(error);
                return null;
              }
    }

    const addToLog = () => {
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
            userRating: rating
          };
        databaseCall.post(logUrl, movieDataPOST)
            .then((response) => {
                console.log("Response from back end: ", response);
                setRefetchDb(!refetchDb);
                // // // // Reset the rating state
                setRating(0); 

                if (checked) {
                    handleDelete();
                }
                handleClose();
            })
            .catch((error) => {
                console.error("Error while calling back end: ", error);
            });
    };

    return (
        <React.Fragment>
            <Button
            size="small"
            onClick={handleClickOpen}
            variant="contained"
            color="primary"
            >
                <Typography sx={{color: "accent.main"}}>Rate and Log</Typography>
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
                <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
            </DialogContent>
            <DialogContent>
                Remove from watchlist? 
                <Switch 
                    checked={checked}
                    onChange={handleChange}
                />
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