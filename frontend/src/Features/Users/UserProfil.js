import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Share } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";

const UserProfil = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState("Nom");
  const [prenom, setPrenom] = useState("Prenom");
  const [adresse, setAdresse] = useState("Adresse");
  const [modifier, setModifier] = useState("");
  // const [users, setUsers] = useState([nom, prenom, adresse]);
  return (
    <AppLayout>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Card display="flex">
          <CardMedia
            // classes={mediaStyles}
            image={
              "https://images.unsplash.com/photo-1517147177326-b37599372b73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2229&q=80"
            }
            sx={{ width: "100%", height: "100%" }}
          />
          <CardContent>
            <Stack spacing={2} alignItems="center">
              <Avatar
                src={"https://i.pravatar.cc/300"}
                sx={{
                  height: "50%",
                  width: "50%",
                  alignSelf: "center",
                }}
              />

              {/* <CardHeader /> */}
            </Stack>

            <Box mt={4}>
              <TextField
                variant="filled"
                fullWidth
                value={nom}
                sx={{
                  width: "300",
                  display: "block",
                  mt: 2,
                  color: "white",
                }}
                onChange={(e) => setNom(e.target.value)}
                // onFocus={() => alert("oui")}
              />
              <TextField
                variant="filled"
                fullWidth
                value={prenom}
                sx={{
                  width: "300",
                  display: "block",
                  mt: 2,
                  color: "white",
                }}
                onChange={(e) => setPrenom(e.target.value)}
                // onFocus={() => alert("oui")}
              />
              <TextField
                variant="filled"
                fullWidth
                value={adresse}
                sx={{
                  width: "300",
                  display: "block",
                  mt: 2,
                  color: "white",
                }}
                onChange={(e) => setAdresse(e.target.value)}
                // onFocus={() => alert("oui")}
                onFocus={() => setModifier("Modifier")}
              />
            </Box>

            <Box px={2} pb={2} mt={2} textAlign="end">
              <IconButton title="Partager">
                <Share />
              </IconButton>
              <IconButton
                className="btn btn-primary"
                title="Modifier"
                onClick={() => navigate("/userDetail/1")}
                sx={{ fontFamily: "Times New Roman" }}
              >
                <EditIcon />
                <a href="#">{modifier}</a>
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </AppLayout>
  );
};

export default UserProfil;
