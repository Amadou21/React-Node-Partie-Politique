// import { Typography } from "@mui/material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
} from "@mui/material";
import React from "react";
// import { useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export const UserCard = ({ user }) => {
  return (
    <Card>
      <CardHeader
        title={user.nom}
        subheader={user.prenom}
        avatar={<Avatar>{user.id}</Avatar>}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Chip label={user.adresse} icon={<HomeIcon sx={{ fontsize: 15 }} />} />
      </CardContent>
    </Card>
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

  return <Box>{user && <UserCard user={user} />}</Box>;
};

export default UserCompte;
