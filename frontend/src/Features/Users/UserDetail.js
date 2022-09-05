import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  CardActions,
  Button,
  // Link as MuiLink,
  Box,
} from "@mui/material";
// import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom"; //useParams
import WarningIcon from "@mui/icons-material/Warning";
import AppLayout from "../Layout/AppLayout";

const UserDetail = () => {
  // les hooks (useState, useNavigate etc...)
  const navigate = useNavigate();
  // const { id } = useParams();
  const [openDialog, setOpenDialog] = React.useState(false);

  // les comportements
  const retour = () => {
    navigate("/");
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  // const supprimerUser = () => {
  //   setOpenDialog(true);
  // };

  //les variables
  const users = [
    {
      id: 1,
      nom: "Doe",
      prenom: "Jane",
      adresse: "Pourquoi tu veux savoir",
    },
    {
      id: 2,
      nom: "DIARRA",
      prenom: "Aly",
      adresse: "Pourquoi tu veux savoir",
    },
    {
      id: 3,
      nom: "Maiga",
      prenom: "Abba",
      adresse: "Pourquoi tu veux savoir",
    },
    {
      id: 4,
      nom: "Sissoko",
      prenom: "Modibo",
      adresse: "Pourquoi tu veux savoir",
    },
  ];
  const user = users.find((user) => user.id === 2);
  // const updateuserLink = "/users/update/" + user.iduser;
  // const deleteuserLink = "/users/update/" + user.iduser;

  return (
    <AppLayout>
      <Box>
        <Card>
          <CardHeader title="Detail du user" />
          <CardContent>
            <Stack spacing={3}>
              <TextField
                id="outlined-basic"
                label="Nom"
                variant="outlined"
                value={user?.nom}
                name={"nom"}
                inputProps={{ readOnly: true }}
              />
              <TextField
                id="outlined-basic"
                label="Prenom"
                variant="outlined"
                value={user?.prenom}
                name={"prenom"}
                inputProps={{ readOnly: true }}
              />
              <TextField
                id="outlined-basic"
                label="Adresse"
                variant="outlined"
                name={"Adresse"}
                value={user?.adresse}
                inputProps={{ readOnly: true }}
              />
            </Stack>
          </CardContent>

          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant={"contained"} onClick={retour}>
              retour
            </Button>

            <Button
              variant={"contained"}
              // onClick={() => navigate(updateuserLink)}
            >
              modifier
            </Button>

            <Button
              variant={"contained"}
              onClick={() => setOpenDialog(true)} //, navigate(deleteuserLink)
            >
              supprimer
            </Button>
          </CardActions>
        </Card>

        <Dialog open={openDialog}>
          <DialogTitle>
            <WarningIcon
              sx={{
                color: "orange",
                verticalAlign: "middle",
              }}
            />{" "}
            Attention
          </DialogTitle>
          <DialogContent>
            Voullez vous réellement supprimer votre comptes?
            <br /> Cette opération est irréversible
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Non</Button> */}
            <Button
              className="btn btn-primary"
              onClick={handleClose}
              sx={{ color: "red" }}
            >
              Ok
            </Button>
            {/* <Button onClick={handleDelete}>Oui</Button> */}
          </DialogActions>
        </Dialog>
      </Box>
    </AppLayout>
  );
};

export default UserDetail;
