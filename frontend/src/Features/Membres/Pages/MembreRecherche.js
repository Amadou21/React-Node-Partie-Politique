import React from "react";
import AppLayout from "../../Layout/AppLayout";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Autocomplete,
  TextField,
  Stack,
  Grid,
  CardHeader,
} from "@mui/material";
import { Avatar, Chip } from "@mui/material";
import { usePays } from "../Services/PaysServices/pays.store";
import { useType } from "../Services/TypeServices/type.store";
import { useRegion } from "../Services/RegionServices/region.store";
import { useLocalite } from "../Services/LocaliteServices/localite.store";
import { optionsLocalite, optionsType, optionsRegion } from "./Module";

const MembreRecherche = () => {
  const { pays } = usePays();
  const { types } = useType();
  const { region } = useRegion();
  const { localite } = useLocalite();
  /*const pays = [
    { libellePays: "Mali" },
    { libellePays: "Guinee" },
    { libellePays: "Congo" },
    { libellePays: "Burkina" },
  ];*/
  // const type = [{ libellePays: "National" }, { libellePays: "Regional" }];
  // const region = [{ libellePays: "Kayes" }, { libellePays: "Koulikoro" }];
  // const localite = [{ libellePays: "Kayes" }, { libellePays: "Koulikoro" }];

  const options = (param) =>
    param.map((option) => {
      const firstLetter = option.libellePays[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    });

  // const optionsType = (param) =>
  //   param.map((option) => {
  //     const firstLetter = option.libelleType[0].toUpperCase();
  //     return {
  //       firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
  //       ...option,
  //     };
  //   });

  // const optionsRegion = (param) =>
  //   param.map((option) => {
  //     const firstLetter = option.libelleRegion[0].toUpperCase();
  //     return {
  //       firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
  //       ...option,
  //     };
  //   });

  // const optionsLocalite = (param) =>
  //   param.map((option) => {
  //     const firstLetter = option.libelleLocalite[0].toUpperCase();
  //     return {
  //       firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
  //       ...option,
  //     };
  //   });

  return (
    <AppLayout>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} sm={6} lg={3}>
              <Autocomplete
                id="grouped-demo"
                options={options(pays).sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.libellePays}
                sx={{ minWidth: 300 }}
                renderInput={(params) => <TextField {...params} label="Pays" />}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={6} lg={3}>
              <Autocomplete
                id="grouped-demo"
                options={optionsType(types).sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.libelleType}
                sx={{ minWidth: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="types de Bureau" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={6} lg={3}>
              <Autocomplete
                id="grouped-demo"
                options={optionsRegion(region).sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.libelleRegion}
                sx={{ minWidth: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Region du bureau" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={6} lg={3}>
              <Autocomplete
                id="grouped-demo"
                options={optionsLocalite(localite).sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.libelleLocalite}
                sx={{ minWidth: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Les differentes localitée" />
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 345, mt: 3 }}>
        <CardContent sx={{ dispay: "flex" }}>
          <Box>
            <CardMedia
              component="img"
              height="240"
              alt="Photo du bureau"
              image={require("../../../Resources/bureau.jpg")}
            />
            <Box>
              <Typography gutterBottom variant="h5" component="div">
                Bureau de Bougounie
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </Box>
          </Box>
          <Card elevation={4} sx={{ padding: 3, marginTop: 5 }}>
            <Stack>
              <Typography gutterBottom variant="h5" component="div">
                Liste des membres
              </Typography>
              <TextField
                label="Rechercher"
                sx={{ minWidth: 300, maxWidth: 500, alignSelf: "center" }}
              />
            </Stack>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} sm={6} lg={4} xl={3}>
                  <Card>
                    <CardHeader
                      title="Amadou Maiga"
                      subheader="amadou@gmail.com"
                      avatar={<Avatar>A</Avatar>}
                    />
                    <CardContent>
                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          Poste:{" "}
                        </Typography>
                        <Typography variant="p">Developpeur</Typography>
                      </Box>
                      <Box sx={{ justifyContent: "end" }}>
                        <Chip
                          sc={{ alignSelf: "end", mt: 2 }}
                          label="voir plus"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </AppLayout>
  );
};

export default MembreRecherche;
