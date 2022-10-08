import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box } from "@mui/material";
import styled from "@emotion/styled";
import SignupForm from "../Components/SignupForm";
import { motion } from "framer-motion";
import AppLayout from "../../Layout/AppLayout";

//////////////////////////////////
const RootStyle = styled("div")({
  background: "#EBF1F1",
  height: "83vh",
  display: "grid",
  placeItems: "center",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled(Box)({
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
    y: 40,
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

const Inscription = ({ setAuth }) => {
  return (
    // <AppLayout>
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <Typography variant="h5" sx={{ color: "text.secondary", mb: 5 }}>
              Entrez vos coordonnées
            </Typography>
          </HeadingStyle>
          <Box component={motion.div} {...fadeInUp}></Box>
          <SignupForm setAuth={setAuth} />

          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Vous avez deja un compte?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/connexion">
              Connectez vous
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
    // </AppLayout>
  );
};

export default Inscription;
