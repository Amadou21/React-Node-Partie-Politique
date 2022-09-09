import React, { useEffect } from "react";
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
  // getAutocompleteUtilityClass,
} from "@mui/material";
import { Avatar, Chip } from "@mui/material";
import { usePays } from "../Services/PaysServices/pays.store";
import { useType, useTypeById } from "../Services/TypeServices/type.store";
import {
  useRegion,
  useRegionById,
} from "../Services/RegionServices/region.store";
import {
  useLocalite,
  useLocaliteById,
} from "../Services/LocaliteServices/localite.store";
import { optionsLocalite, optionsType, optionsRegion } from "./Module";
import { useBureaux } from "../Services/BureauServices/bureau.store";

const MembreRecherche = () => {
  const { pays } = usePays();
  const { types } = useType();
  const { regions } = useRegion();
  const { localites } = useLocalite();
  const { bureaux } = useBureaux();
  const [valuePays, setValuePays] = React.useState(null); //pays
  const [valueType, setValueType] = React.useState(null); //types
  const [valueRegion, setValueRegion] = React.useState(regions); //null
  const [valueLocalite, setValueLocalite] = React.useState(localites); //null
  const [valueBureau, setValueBureau] = React.useState(null);

  //----------------------------------------------------------------

  useEffect(() => {
    setValueRegion(regions);
  }, [regions]);

  //----------------------------------------------------------------
  const handleValuePays = (event, newValue) => {
    setValuePays(pays.find((pays) => pays.idPays === newValue.idPays));
    console.log(valuePays);
  };

  const handleAutoCompletePays = (newValue) => {
    if (newValue.libelleType === "Regional") {
      console.log("newValue", valuePays);

      const regionTrouver = regions.filter(
        (region) => region.idPays === valuePays.idPays
      );
      setValueRegion(regionTrouver);

      return regionTrouver;
    } else {
      // const { type } = useTypeById(valueType.idType);//valueType.idType ===1 <=>'National'
      setValueBureau(
        bureaux.filter((bureau) => bureau.idType === newValue.idType)
      );
      console.log("bureaux id", bureaux[0].idType);

      const bureauSelect = bureaux.filter(
        (bureau) => bureau.idType === newValue.idType
      );
      console.log("bureauSelect", bureauSelect);

      setValueLocalite(
        localites.filter(
          (localite) => localite.idLocalite === bureauSelect.idLocalite
        )
      );
      const localiteSelect = localites.find(
        (localite) => localite.idLocalite === bureauSelect.idLocalite
      );
      console.log("localiteSelect", localiteSelect);
      setValueRegion(
        regions.filter((region) => region.idRegion === localiteSelect.idRegion)
      );
    }
  };
  //----------------------------------------------------------------

  const handleAutoCompleteRegion = (event, newValue) => {
    const localiteTrouver = localites.filter(
      (localite) => localite.idRegion === newValue.idRegion
    );
    setValueLocalite(
      localites.filter((localite) => localite.idRegion === newValue.idRegion)
    );
    return localiteTrouver;
  };
  //----------------------------------------------------------------
  const options = (param) =>
    param.map((option) => {
      const firstLetter = option.libellePays[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    });
  // var pays_value =getAutocompleteUtilityClass
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
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ minWidth: 300 }}
                onChange={(event, newValue) => handleValuePays(event, newValue)}
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
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ minWidth: 300 }}
                onChange={(event, newValue) => {
                  setValueType(newValue);
                  //----------------------------------------------------------------
                  setValueRegion(handleAutoCompletePays(newValue));
                  //----------------------------------------------------------------
                }}
                renderInput={(params) => (
                  <TextField {...params} label="types de Bureau" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={6} lg={3}>
              <Autocomplete
                id="grouped-demo"
                options={optionsRegion(valueRegion).sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.libelleRegion}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ minWidth: 300 }}
                //----------------------------------------------------------------

                onChange={(event, newValue) => {
                  setValueLocalite(handleAutoCompleteRegion(event, newValue));
                }}
                //----------------------------------------------------------------

                renderInput={(params) => (
                  <TextField {...params} label="Region du bureau" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={6} lg={3}>
              <Autocomplete
                id="grouped-demo"
                options={optionsLocalite(valueLocalite).sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.libelleLocalite}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ minWidth: 300 }}
                //----------------------------------------------------------------
                onChange={(event, newValue) => {
                  // setValueLocalite(newValue);
                  const localiteSelect = newValue;
                  setValueBureau(
                    bureaux.find(
                      (bureau) =>
                        bureau.idLocalite === localiteSelect.idLocalite
                    )
                  );
                }}
                //----------------------------------------------------------------

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
