// import { Typography } from "@mui/material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
import React from "react";
// import { useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import UserDetail from "./UserDetail";
import AppLayout from "../Layout/AppLayout";

export const UserCard = ({ user }) => {
  return (
    // <AppLayout>
    <Card>
      <CardHeader
        avatar={
          <Stack
            direction="column"
            justifyContent="space-around"
            alignItems="stretch"
            spacing={2}
          >
            <Avatar>{user.id}</Avatar>
          </Stack>
        }
        title={user.nom}
        subheader={user.prenom}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Chip label={user.adresse} icon={<HomeIcon sx={{ fontsize: 15 }} />} />
      </CardContent>
    </Card>
    // </AppLayout>
  );
};

const UserCompte = () => {
  // const { id } = useParams();
  const user = {
    id: 2,
    nom: "DIARRA",
    prenom: "Aly",
    adresse: "Pourquoi tu veux savoir?",
  };

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users/" + id)
  //     .then((res) => res.json())
  //     .then((data) => setUser(data));
  // }, [id]);

  //   const _user = users.find((user) => user.id === id);

  return (
    <Box>
      {user && (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Box>
            <UserCard user={user} />
          </Box>
          <Box>
            <UserDetail />
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default UserCompte;
