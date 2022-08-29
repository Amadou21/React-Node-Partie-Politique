import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box } from "@mui/material";
import styled from "@emotion/styled";
import LoginForm from "./Components/LoginForm";
import AppLayout from "../Layout/AppLayout";

//////////////////////////////////
const RootStyle = styled("div")({
    background: "rgb(249, 250, 251)",
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
    return (
        <AppLayout>
            <RootStyle>
                <Container maxWidth="sm">
                    <ContentStyle>
                        <HeadingStyle {...fadeInUp}>
                            <Typography variant='h5' sx={{ color: "text.secondary", mb: 5 }}>
                                Connectez vous a votre compte
                            </Typography>
                        </HeadingStyle>
                        <LoginForm />
                        <Typography
                            {...fadeInUp}
                            variant="body2"
                            align="center"
                            sx={{ mt: 3 }}
                        >
                            Vous n'avez pas de compte?{" "}
                            <Link variant="subtitle2" component={RouterLink} to="#">
                                Inscrivez vous
                            </Link>
                        </Typography>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </AppLayout>
    );
};

export default Connexion;