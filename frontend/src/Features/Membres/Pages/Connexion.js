import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import Paper, { PaperProps } from '@mui/material/Paper'
import styled from "@emotion/styled";
import LoginForm from "../Components/LoginForm";
import AppLayout from "../../Layout/AppLayout";
import Draggable from 'react-draggable';

function PaperComponent({PaperProps}) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper PaperProps={PaperProps} />
      </Draggable>
    );
  }

//////////////////////////////////
const RootStyle = styled(Box)({
    background: "#EBF1F1",
    height: "85vh",
    display: "grid",
    placeItems: "center",
});

const HeadingStyle = styled(Box)({
    textAlign: "center",
});

const ContentStyle = styled("div")({
    maxWidth: 480,
    padding: 25,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background: "#fff",
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.6, ease: easing },
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easing,
        },
    },
};
const Connexion = () => {

    const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

    return (
        <AppLayout>
            <RootStyle sx={{ ml: 0 }}>
                <Container maxWidth="sm">
                    <ContentStyle>
                        <HeadingStyle {...fadeInUp}>
                            <Typography variant='h5' sx={{ color: "text.secondary", mb: 5 }}>
                                Connectez vous a votre compte
                            </Typography>
                        </HeadingStyle>
                        <LoginForm handleClickOpen={handleClickOpen}/>
                        <Typography
                            {...fadeInUp}
                            variant="body2"
                            align="center"
                            sx={{ mt: 3 }}
                        >
                            Vous n'avez pas de compte?{" "}
                            <Link variant="subtitle2" component={RouterLink} to="/inscription">
                                Inscrivez vous
                            </Link>
                        </Typography>
                    </ContentStyle>
                </Container>
            </RootStyle>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Connexion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Email ou mot de passe incorrecte
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(handleClose)}>Fermer</Button>
                </DialogActions>
            </Dialog>
        </AppLayout>
    );
};

export default Connexion;